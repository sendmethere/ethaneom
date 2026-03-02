import { usePortfolio } from '@/context/PortfolioContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy } from 'lucide-react'

function formatDate(dateStr) {
  if (!dateStr) return null
  const [y, m] = dateStr.split('-')
  return `${y}.${m}`
}

export default function Awards() {
  const { getByCategory } = usePortfolio()
  const items = getByCategory('awards')

  return (
    <section id="awards" className="section-padding bg-bg-light">
      <div className="container-base">
        <div className="mb-12">
          <p className="section-label mb-2">Recognition</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-heading text-text">
            수상 경력
          </h2>
          <p className="mt-3 text-text-muted">
            교육과 수업에 대한 열정으로 끊임 없이 연구하고 도전하고 있습니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((item) => (
            <Card key={item.title} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Trophy size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-semibold text-text leading-snug">{item.title}</p>
                      {item.date && (
                        <Badge variant="muted" className="flex-shrink-0 text-xs">
                          {formatDate(item.date)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
