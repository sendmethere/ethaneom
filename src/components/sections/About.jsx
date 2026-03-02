import { usePortfolio } from '@/context/PortfolioContext'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Briefcase } from 'lucide-react'

function formatYear(dateStr) {
  if (!dateStr) return null
  return dateStr.slice(0, 4)
}

export default function About() {
  const { getByCategory } = usePortfolio()
  const items = getByCategory('profile').filter((i) => i.title !== '자기소개')

  const education = items.filter((i) => i.title.startsWith('학력'))
  const position = items.find((i) => i.title === '재직')

  return (
    <section id="about" className="section-padding bg-bg-deep/40">
      <div className="container-base">
        <div className="mb-12">
          <p className="section-label mb-2">About</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-heading text-text">
            소개
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={18} className="text-primary" />
              <h3 className="text-base font-semibold text-text">학력</h3>
            </div>
            <div className="space-y-6">
              {education.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div className="flex-1 w-px bg-bg-deep mt-2" />
                  </div>
                  <div className="pb-6">
                    {item.date && (
                      <p className="text-xs text-text-muted mb-1">{formatYear(item.date)}</p>
                    )}
                    <p className="font-semibold text-sm text-text mb-1">
                      {item.title.replace('학력 — ', '')}
                    </p>
                    <p className="text-sm text-text-muted leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Position */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={18} className="text-primary" />
              <h3 className="text-base font-semibold text-text">소속</h3>
            </div>
            {position && (
              <div className="bg-white rounded-xl border border-bg-deep p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="font-semibold text-text">{position.content}</p>
                  <Badge
                    variant="muted"
                    className="flex-shrink-0 bg-amber-100 text-amber-700 border border-amber-200"
                  >
                    휴직 중
                  </Badge>
                </div>
                <p className="text-sm text-text-muted">
                  {position.date?.slice(0, 7).replace('-', '.')} ~
                </p>
              </div>
            )}

            {/* Interests quick-view */}
            <div className="mt-6">
              <p className="text-sm font-medium text-text-muted mb-3">관심 분야</p>
              <div className="flex flex-wrap gap-2">
                {getByCategory('interests').map((i) => (
                  <Badge key={i.title} variant="muted">
                    {i.description}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
