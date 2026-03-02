import { Mail, ChevronDown } from 'lucide-react'
import { profileInfo } from '@/data/portfolio'

export default function Hero() {
  return (
    <section
      id="top"
      className="min-h-screen flex flex-col justify-center bg-bg-light pt-16"
    >
      <div className="container-base">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20 py-20">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            {/* Label */}
            <p className="section-label mb-4">Teacher · Researcher</p>

            {/* Name */}
            <h1 className="text-5xl md:text-6xl font-bold tracking-heading text-text mb-2">
              {profileInfo.name}
            </h1>
            <p className="text-lg md:text-xl text-text-muted font-medium mb-6 tracking-widest">
              {profileInfo.nameEn}
            </p>

            {/* Tagline */}
            <p className="text-base md:text-lg text-text leading-body max-w-md mx-auto md:mx-0 mb-8 border-l-4 border-primary pl-4">
              {profileInfo.tagline}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href={`mailto:${profileInfo.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 bg-primary text-white hover:bg-primary-dark active:scale-[0.98] px-8 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Mail size={16} />
                이메일 보내기
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 border border-primary text-primary bg-transparent hover:bg-primary/5 active:scale-[0.98] px-8 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                소개 보기
              </a>
            </div>

            {/* Email label */}
            <p className="mt-6 text-sm text-text-muted">
              <Mail size={13} className="inline mr-1.5 mb-0.5" />
              {profileInfo.email}
            </p>
          </div>

          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-bg-light shadow-xl">
                <img
                  src={profileInfo.photo}
                  alt={`${profileInfo.name} 프로필 사진`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative dot */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center pb-10 animate-bounce">
        <a href="#about" aria-label="아래로 스크롤">
          <ChevronDown size={24} className="text-text-muted" />
        </a>
      </div>
    </section>
  )
}
