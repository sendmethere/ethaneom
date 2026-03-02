import { usePortfolio } from '@/context/PortfolioContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Code2, Wrench } from 'lucide-react'

const techItems = ['ReactJS', 'Python & Django']
const projectItems = ['탐탐몬', '메모몬', '마이리틀랩']

export default function Skills() {
  const { getByCategory } = usePortfolio()
  const items = getByCategory('skills')
  const tech = items.filter((i) => techItems.includes(i.title))
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

        {/* Projects */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Wrench size={16} className="text-primary" />
            <h3 className="text-base font-semibold text-text">제작 프로젝트</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((item) => (
              <Card key={item.title} className="bg-white group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <p className="font-bold text-text text-lg mb-2 tracking-heading">
                      {item.title}
                    </p>
                    <p className="text-sm text-text-muted leading-relaxed mb-4">
                      {item.content}
                    </p>
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors group-hover:underline"
                    >
                      <ExternalLink size={13} />
                      {item.url.replace('https://', '')}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Study groups & interests */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">
          {/* Study Groups */}
          <div>
            <p className="section-label mb-4">Study Groups</p>
            <div className="space-y-4">
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
            <div className="flex flex-wrap gap-3">
              {getByCategory('interests').map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-bg-deep rounded-xl px-5 py-3 shadow-sm"
                >
                  <p className="font-semibold text-sm text-text">{item.title}</p>
                  <p className="text-xs text-text-muted mt-0.5">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
