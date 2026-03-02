import { createContext, useContext, useState, useEffect } from 'react'
import { portfolioItems } from '@/data/portfolio'

const PortfolioContext = createContext(null)

function filterByCategory(items, category) {
  return items.filter((item) => item.category === category)
}

export function PortfolioProvider({ children }) {
  const [items, setItems] = useState(portfolioItems)
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState('static') // 'static' | 'notion'

  useEffect(() => {
    fetch('/.netlify/functions/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data)
          setSource('notion')
        }
      })
      .catch(() => {
        // 함수 미설정 또는 오류 → 정적 데이터 유지
        setSource('static')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <PortfolioContext.Provider
      value={{
        items,
        loading,
        source,
        getByCategory: (category) => filterByCategory(items, category),
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
