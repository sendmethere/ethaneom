const DATABASE_ID = '317b09d4-0542-805c-b2e5-dcbd15257d44'
const NOTION_VERSION = '2022-06-28'

/** Notion property → 일반 값 변환 */
function parseProperty(prop) {
  if (!prop) return null
  switch (prop.type) {
    case 'title':
      return prop.title?.map((t) => t.plain_text).join('') || null
    case 'rich_text':
      return prop.rich_text?.map((t) => t.plain_text).join('') || null
    case 'select':
      return prop.select?.name || null
    case 'multi_select':
      return prop.multi_select?.map((s) => s.name).join(', ') || null
    case 'date':
      return prop.date?.start || null
    case 'url':
      return prop.url || null
    default:
      return null
  }
}

/** Notion DB 전체 쿼리 (pagination 포함) */
async function queryAll(apiKey) {
  const results = []
  let cursor = undefined

  do {
    const body = {
      sorts: [{ property: 'date', direction: 'descending' }],
      ...(cursor ? { start_cursor: cursor } : {}),
    }

    const res = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Notion-Version': NOTION_VERSION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Notion API ${res.status}: ${text}`)
    }

    const data = await res.json()
    results.push(...data.results)
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)

  return results
}

export const handler = async () => {
  const apiKey = process.env.NOTION_API_KEY

  if (!apiKey) {
    return {
      statusCode: 503,
      body: JSON.stringify({ error: 'NOTION_API_KEY not configured' }),
    }
  }

  try {
    const pages = await queryAll(apiKey)

    const items = pages.map((page) => {
      const p = page.properties
      return {
        // Notion CSV import 시 title 컬럼은 title 또는 rich_text 타입으로 들어올 수 있음
        category: parseProperty(p.category),
        title: parseProperty(p.title) ?? parseProperty(p.Name),
        content: parseProperty(p.content),
        description: parseProperty(p.description),
        date: parseProperty(p.date),
        url: parseProperty(p.url),
      }
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // Netlify CDN 캐시 5분, stale-while-revalidate 10분
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
      body: JSON.stringify(items),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
