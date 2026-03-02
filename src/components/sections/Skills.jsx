import { usePortfolio } from '@/context/PortfolioContext'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Code2, Wrench } from 'lucide-react'

export default function Skills() {
  const { getByCategory } = usePortfolio()
  const tech     = getByCategory('skills')
  const projects = getByCategory('skills_project')

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

        {/* Projects — 가로 스크롤 */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Wrench size={16} className="text-primary" />
            <h3 className="text-base font-semibold text-text">제작 프로젝트</h3>
          </div>
          <div className="relative -mx-6 md:-mx-12">
            {/* scroll track */}
            <div className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {projects.map((item) => (
                <a
                  key={item.title}
                  href={item.url ?? '#'}
                  target={item.url ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-52 snap-start rounded-2xl p-6 flex flex-col gap-4
                             bg-[#370001] hover:bg-primary
                             shadow-md hover:shadow-xl hover:-translate-y-1
                             transition-all duration-200 group"
                >
                  <div className="w-7 h-0.5 rounded-full bg-white/25 group-hover:bg-white/40 transition-colors" />
                  <p className="font-bold text-white text-base tracking-heading leading-snug flex-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                    {item.content}
                  </p>
                  {item.url && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 group-hover:text-white/80 transition-colors">
                      <ExternalLink size={12} />
                      {item.url.replace('https://', '')}
                    </span>
                  )}
                </a>
              ))}
            </div>
            {/* fade hints */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-6 bg-gradient-to-r from-bg-light to-transparent md:w-12" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-bg-light to-transparent md:w-24" />
          </div>
        </div>

      </div>
    </section>
  )
}
