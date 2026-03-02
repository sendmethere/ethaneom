import { usePortfolio } from '@/context/PortfolioContext'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Users, ExternalLink } from 'lucide-react'

function formatYear(dateStr) {
  if (!dateStr) return null
  return dateStr.slice(0, 4)
}

export default function Activities() {
  const { getByCategory } = usePortfolio()
  const items = getByCategory('activities')

  // Group by year for visual clarity
  const grouped = items.reduce((acc, item) => {
    const year = item.date ? formatYear(item.date) : '기타'
    if (!acc[year]) acc[year] = []
    acc[year].push(item)
    return acc
  }, {})

  const sortedYears = Object.keys(grouped).sort((a, b) => b - a)

  return (
    <section id="activities" className="section-padding bg-bg-deep/40">
      <div className="container-base">
        <div className="mb-12">
          <p className="section-label mb-2">Educational Activities</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-heading text-text">
            교육 관련 활동
          </h2>
          <p className="mt-3 text-text-muted">
            전국의 선생님들과 교류하며 배우고, 함께 성장하고 있습니다.
          </p>
        </div>

        <div className="space-y-10">
          {sortedYears.map((year) => (
            <div key={year} className="flex gap-6 md:gap-10">
              {/* Year label */}
              <div className="flex-shrink-0 w-12 md:w-16">
                <span className="text-sm font-bold text-primary">{year}</span>
              </div>

              {/* Items */}
              <div className="flex-1 bg-white rounded-xl border border-bg-deep shadow-sm overflow-hidden">
                {grouped[year].map((item, i) => (
                  <div key={item.title}>
                    <div className="flex items-start gap-3 p-5">
                      <Users size={15} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-text leading-relaxed">{item.content}</p>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                          >
                            <ExternalLink size={13} />
                            바로가기
                          </a>
                        )}
                      </div>
                    </div>
                    {i < grouped[year].length - 1 && <Separator className="mx-5 w-auto" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
