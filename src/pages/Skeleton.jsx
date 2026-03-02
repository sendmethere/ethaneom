/**
 * /skeleton — 비공개 Notion 편집 참고용 스키마 뷰
 * 네비게이션에 노출되지 않음
 */

const SCHEMA = [
  {
    section: 'Hero',
    id: 'hero',
    note: '정적 데이터 (Notion 연동 없음)',
    source: 'profileInfo',
    groups: [
      {
        category: 'profileInfo (static)',
        fields: [
          { field: 'name',    example: '엄태상' },
          { field: 'nameEn',  example: 'EOM TAE SANG' },
          { field: 'tagline', example: '증거가 바꾸는 교실을 꿈꾸는 교사 연구자입니다.' },
          { field: 'email',   example: 'ethaneom@korea.ac.kr' },
          { field: 'photo',   example: '/profile.png' },
        ],
      },
    ],
  },
  {
    section: 'About',
    id: 'about',
    groups: [
      {
        category: 'profile_education',
        fields: [
          { field: 'title',   example: '학부 / 석사' },
          { field: 'content', example: '전주교육대학교 초등교육과 졸업' },
          { field: 'date',    example: '2017-02-21' },
        ],
      },
      {
        category: 'profile_position',
        fields: [
          { field: 'content', example: '전북특별자치도교육청 초등교사 (초등정교사 1급)' },
          { field: 'date',    example: '2018-03-02' },
        ],
      },
    ],
  },
  {
    section: 'Awards',
    id: 'awards',
    groups: [
      {
        category: 'awards',
        fields: [
          { field: 'title',   example: '교육부장관 표창' },
          { field: 'content', example: '디지털교육전환담당관 부총리 겸 교육부장관 표창' },
          { field: 'date',    example: '2024-12-01' },
          { field: 'url',     example: 'https://...' },
        ],
      },
    ],
  },
  {
    section: 'Research & Writing',
    id: 'research',
    groups: [
      {
        category: 'research_paper',
        fields: [
          { field: 'title',   example: '논문 — 수업 실연 영상 AI 평가 일치도' },
          { field: 'content', example: '엄태상, 장채원, & 임태형. (2025). ...' },
          { field: 'date',    example: '2025-01-01' },
          { field: 'url',     example: 'http://dx.doi.org/...' },
        ],
      },
      {
        category: 'writing',
        fields: [
          { field: 'title',   example: '저서 — 교사들의 에듀테크 활용 바이블' },
          { field: 'content', example: '《교사들의 에듀테크 활용 바이블》 공저' },
          { field: 'date',    example: '2024-01-01' },
          { field: 'url',     example: 'https://...' },
        ],
      },
      {
        category: 'study_group',
        fields: [
          { field: 'title',   example: 'JEWELS 스터디' },
          { field: 'content', example: '학습과학 연구 스터디 JEWELS 스터디 리더' },
        ],
      },
      {
        category: 'interests',
        fields: [
          { field: 'title',   example: '설계-개발 연구' },
          { field: 'content', example: 'Design & Development Research' },
        ],
      },
    ],
  },
  {
    section: 'Training',
    id: 'training',
    groups: [
      {
        category: 'training',
        fields: [
          { field: 'title',   example: '교실혁명 선도교사 양성과정 주강사' },
          { field: 'content', example: '교실혁명 선도교사 양성과정 주강사 (2024–2025)' },
          { field: 'date',    example: '2024-01-01' },
          { field: 'url',     example: 'https://...' },
        ],
      },
    ],
  },
  {
    section: 'Activities',
    id: 'activities',
    note: 'date 연도별로 그룹핑되어 표시',
    groups: [
      {
        category: 'activities',
        fields: [
          { field: 'content',     example: '전국단위 디자인씽킹 연구회 대표 교사' },
          { field: 'description', example: '전국단위 디자인씽킹 연구회 대표 교사 (짧은 부제)' },
          { field: 'date',        example: '2025-01-01' },
          { field: 'url',         example: 'https://...' },
        ],
      },
    ],
  },
  {
    section: 'Skills & Projects',
    id: 'skills',
    groups: [
      {
        category: 'skills',
        note: '뱃지 형태로 나열',
        fields: [
          { field: 'title', example: 'ReactJS' },
        ],
      },
      {
        category: 'skills_project',
        note: '가로 스크롤 카드',
        fields: [
          { field: 'title',   example: '탐탐몬' },
          { field: 'content', example: '개념기반탐구 수업 도구 《탐탐몬》' },
          { field: 'url',     example: 'https://tamtammon.netlify.app' },
        ],
      },
    ],
  },
  {
    section: 'Content',
    id: 'content',
    note: 'image 필드: Notion URL 속성. 파일은 /public/contents/ 에 업로드',
    groups: [
      {
        category: 'content',
        fields: [
          { field: 'title',   example: '수업 콘텐츠 제목' },
          { field: 'content', example: '콘텐츠 설명' },
          { field: 'url',     example: 'https://...' },
          { field: 'image',   example: '/contents/thumbnail.jpg  또는 외부 URL' },
        ],
      },
    ],
  },
]

const FIELD_COLOR = {
  title:       'bg-blue-100 text-blue-800',
  content:     'bg-green-100 text-green-800',
  description: 'bg-purple-100 text-purple-800',
  date:        'bg-orange-100 text-orange-800',
  url:         'bg-sky-100 text-sky-800',
  image:       'bg-pink-100 text-pink-800',
}

function FieldChip({ field, example }) {
  const color = FIELD_COLOR[field] ?? 'bg-gray-100 text-gray-700'
  return (
    <div className="flex items-start gap-2 py-1">
      <span className={`shrink-0 inline-block text-xs font-mono font-semibold px-2 py-0.5 rounded ${color}`}>
        .{field}
      </span>
      <span className="text-xs text-gray-400 leading-5 truncate">{example}</span>
    </div>
  )
}

export default function Skeleton() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-gray-800 pb-6">
          <p className="text-xs font-mono text-gray-500 mb-1">🔒 internal · not linked in nav</p>
          <h1 className="text-2xl font-bold tracking-tight">Page Schema Reference</h1>
          <p className="mt-1 text-sm text-gray-400">
            Notion DB 편집 시 각 섹션이 어떤 <code className="text-gray-300 bg-gray-800 px-1 rounded">category</code> 의 어떤 필드를 참조하는지 확인하세요.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Object.entries(FIELD_COLOR).map(([f, c]) => (
            <span key={f} className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${c}`}>.{f}</span>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {SCHEMA.map((sec) => (
            <div key={sec.id} className="rounded-xl border border-gray-800 overflow-hidden">
              {/* Section header */}
              <div className="flex items-center gap-3 bg-gray-900 px-5 py-3">
                <span className="text-xs font-mono text-gray-500">#{sec.id}</span>
                <span className="font-semibold text-gray-100">{sec.section}</span>
                {sec.note && (
                  <span className="text-xs text-gray-500 ml-auto">{sec.note}</span>
                )}
              </div>

              {/* Groups */}
              <div className="divide-y divide-gray-800">
                {sec.groups.map((g) => (
                  <div key={g.category} className="flex gap-0 md:gap-6 flex-col md:flex-row px-5 py-4">
                    {/* Category */}
                    <div className="shrink-0 w-48 mb-3 md:mb-0">
                      <span className="inline-block text-xs font-mono font-bold bg-gray-800 text-emerald-400 px-2 py-1 rounded">
                        {g.category}
                      </span>
                      {g.note && (
                        <p className="text-xs text-gray-600 mt-1">{g.note}</p>
                      )}
                    </div>
                    {/* Fields */}
                    <div className="flex-1">
                      {g.fields.map((f) => (
                        <FieldChip key={f.field} field={f.field} example={f.example} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-gray-700 text-center font-mono">
          ethaneom · skeleton view
        </p>
      </div>
    </div>
  )
}
