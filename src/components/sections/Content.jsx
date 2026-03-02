import { usePortfolio } from '@/context/PortfolioContext'
import { ExternalLink } from 'lucide-react'

export default function Content() {
  const { getByCategory } = usePortfolio()
  const items = getByCategory('content')

  if (!items.length) return null

  return (
    <section id="content" className="section-padding bg-bg-deep/40">
      <div className="container-base">
        <div className="mb-12">
          <p className="section-label mb-2">Content</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-heading text-text">
            콘텐츠 집필
          </h2>
          <p className="mt-3 text-text-muted">
            수업과 교육에 관한 생각을 콘텐츠로 나눕니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.url ?? '#'}
              target={item.url ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group bg-white rounded-xl border border-bg-deep shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="aspect-video w-full bg-bg-deep overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl text-text-muted/40 font-bold tracking-heading">
                      {item.title.slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <p className="font-semibold text-text leading-snug">{item.title}</p>
                {item.content && (
                  <p className="text-sm text-text-muted leading-relaxed flex-1">
                    {item.content}
                  </p>
                )}
                {item.url && (
                  <span className="inline-flex items-center gap-1.5 mt-1 text-xs font-medium text-primary group-hover:text-primary-dark transition-colors">
                    <ExternalLink size={12} />
                    바로가기
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
