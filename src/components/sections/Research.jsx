import { useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, FileText, BookMarked } from 'lucide-react'

function formatYear(dateStr) {
  if (!dateStr) return null
  return dateStr.slice(0, 4)
}

const TABS = [
  { key: 'paper', label: '논문', icon: FileText },
  { key: 'book',  label: '저서', icon: BookMarked },
]

export default function Research() {
  const { getByCategory } = usePortfolio()
  const [activeTab, setActiveTab] = useState('paper')

  const allItems = getByCategory('research')
  const papers = allItems.filter((i) => i.title.startsWith('논문'))
  const books   = allItems.filter((i) => i.title.startsWith('저서'))
  const visible  = activeTab === 'paper' ? papers : books

  return (
    <section id="research" className="section-padding bg-bg-deep/40">
      <div className="container-base">
        {/* Section header */}
        <div className="mb-10">
          <p className="section-label mb-2">Research & Writing</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-heading text-text">
            연구 및 집필
          </h2>
          <p className="mt-3 text-text-muted">
            에듀테크와 AI가 바꾸는 교실, 교사 역량에 주목하고 연구하고 있습니다.
          </p>
        </div>

        {/* Toggle */}
        <div className="inline-flex items-center bg-bg-deep rounded-xl p-1 mb-8">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === key
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              <Icon size={15} />
              {label}
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 ${
                  activeTab === key
                    ? 'bg-primary/10 text-primary'
                    : 'bg-bg-light text-text-muted'
                }`}
              >
                {key === 'paper' ? papers.length : books.length}
              </span>
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="space-y-5">
          {visible.map((item) => (
            <Card key={item.title} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {activeTab === 'paper'
                      ? <FileText size={18} className="text-primary" />
                      : <BookMarked size={18} className="text-primary" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="default">
                        {activeTab === 'paper' ? '논문' : '저서'}
                      </Badge>
                      {item.date && (
                        <Badge variant="muted">{formatYear(item.date)}</Badge>
                      )}
                    </div>
                    <p className="font-semibold text-text mb-2 leading-snug">
                      {item.title.replace(/^(논문|저서) — /, '')}
                    </p>
                    <p className="text-sm text-text-muted leading-relaxed mb-3">
                      {item.content}
                    </p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                      >
                        <ExternalLink size={13} />
                        {activeTab === 'paper' ? '논문 바로가기' : '도서 바로가기'}
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {visible.length === 0 && (
            <p className="text-sm text-text-muted py-8 text-center">
              등록된 {activeTab === 'paper' ? '논문' : '저서'}이 없습니다.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
