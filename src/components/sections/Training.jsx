import { usePortfolio } from '@/context/PortfolioContext'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Mic, ExternalLink } from 'lucide-react'

export default function Training() {
  const { getByCategory } = usePortfolio()
  const items = getByCategory('training')

  return (
    <section id="training" className="section-padding bg-bg-light">
      <div className="container-base">
        <div className="mb-12">
          <p className="section-label mb-2">Teaching & Training</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-heading text-text">
            연수
          </h2>
          <p className="mt-3 text-text-muted">
            배운 바를 나누며 교사 전문성 강화에 힘쓰고 있습니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-bg-deep shadow-sm overflow-hidden">
          {items.map((item, i) => (
            <div key={item.title}>
              <div className="flex items-start gap-4 p-6">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mic size={14} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                    <p className="font-semibold text-text text-sm leading-snug">{item.title}</p>
                    {item.date && (
                      <Badge variant="muted" className="text-xs flex-shrink-0">
                        {item.date.slice(0, 4)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{item.content}</p>
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
              {i < items.length - 1 && <Separator className="mx-6 w-auto" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
