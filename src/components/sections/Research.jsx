import { useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, FileText, BookMarked } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

function formatYear(dateStr) {
  if (!dateStr) return null
  return dateStr.slice(0, 4)
}

const TABS = [
  { key: 'research_paper', label: '논문', icon: FileText },
  { key: 'writing',        label: '저서', icon: BookMarked },
]

export default function Research() {
  const { getByCategory } = usePortfolio()
  const [activeTab, setActiveTab] = useState('research_paper')

  const visible = getByCategory(activeTab)

  return (
    <section id="research" className="section-padding bg-bg-light">
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
                    {activeTab === 'research_paper'
                      ? <FileText size={18} className="text-primary" />
                      : <BookMarked size={18} className="text-primary" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    {item.date && (
                      <Badge variant="muted" className="mb-2">{formatYear(item.date)}</Badge>
                    )}
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
                        {activeTab === 'research_paper' ? '논문 바로가기' : '도서 바로가기'}
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {visible.length === 0 && (
            <p className="text-sm text-text-muted py-8 text-center">
              등록된 {activeTab === 'research_paper' ? '논문' : '저서'}이 없습니다.
            </p>
          )}
        </div>

        {/* {/* Study Groups */}
        {/* <Separator className="my-12" />
        <div className="mb-10">
          <p className="section-label mb-4">Study Groups</p>
          <div className="space-y-3">
            {getByCategory('study_group').map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-bg-deep p-5 shadow-sm">
                <p className="font-semibold text-sm text-text mb-1">{item.title}</p>
                <p className="text-sm text-text-muted leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div> */}

        <Separator className="my-12" />

        {/* Research Interests */}
        <div>
          <p className="section-label mb-4">Research Interests</p>
          <div className="flex flex-wrap gap-2">
            {getByCategory('interests').map((item) => (
              <div
                key={item.title}
                className="inline-flex flex-col px-4 py-2 rounded-full border border-bg-deep bg-white"
              >
                <span className="text-base font-semibold text-text leading-snug">{item.title}</span>
                {item.content && (
                  <span className="text-xs text-text-muted/70 leading-snug">{item.content}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
