import { usePortfolio } from '@/context/PortfolioContext'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Code2, Wrench } from 'lucide-react'

const techItems = ['ReactJS', 'Python & Django']
const projectItems = ['탐탐몬', '메모몬', '마이리틀랩']

export default function Skills() {
  const { getByCategory } = usePortfolio()
  const items = getByCategory('skills')
  const tech     = items.filter((i) => techItems.includes(i.title))
  const projects = items.filter((i) => projectItems.includes(i.title))

  return (
    <section id="skills" className="section-padding bg-bg-light">
      <div className="container-base">
        <div className="mb-12">
          <p className="section-label mb-2">Skills & Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-heading text-text">
            기술 및 프로젝트
          </h2>
          <p className="mt-3 text-text-muted">
            코딩, 디자인을 비롯한 각종 실무 경력을 바탕으로 역량을 갖추었습니다.
          </p>
        </div>

        {/* Tech stack */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Code2 size={16} className="text-primary" />
            <h3 className="text-base font-semibold text-text">기술 스택</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {tech.map((item) => (
              <Badge key={item.title} variant="outline" className="text-sm px-4 py-1.5">
                {item.title}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects — 가로 스크롤, 카드 전체 클릭 */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-5">
            <Wrench size={16} className="text-primary" />
            <h3 className="text-base font-semibold text-text">제작 프로젝트</h3>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-3 -mx-6 px-6 md:-mx-12 md:px-12 snap-x snap-mandatory">
            {projects.map((item) => (
              <a
                key={item.title}
                href={item.url ?? '#'}
                target={item.url ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex-shrink-0 w-64 md:w-72 snap-start bg-white rounded-xl border border-bg-deep shadow-sm p-6 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <p className="font-bold text-text text-lg tracking-heading">
                  {item.title}
                </p>
                <p className="text-sm text-text-muted leading-relaxed flex-1">
                  {item.content}
                </p>
                {item.url && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary group-hover:text-primary-dark transition-colors">
                    <ExternalLink size={13} />
                    {item.url.replace('https://', '')}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Study Groups */}
        <div className="mb-10">
          <p className="section-label mb-4">Study Groups</p>
          <div className="space-y-3">
            {getByCategory('study_group').map((item) => (
              <div key={item.title} className="bg-bg-deep/50 rounded-xl p-5">
                <p className="font-semibold text-sm text-text mb-1">{item.title}</p>
                <p className="text-sm text-text-muted leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Interests */}
        <div>
          <p className="section-label mb-4">Research Interests</p>
          <div className="flex flex-wrap gap-2">
            {getByCategory('interests').map((item) => (
              <Badge key={item.title} variant="outline" className="text-sm px-4 py-1.5">
                {item.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
