import { Mail } from 'lucide-react'
import { profileInfo } from '@/data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-bg-deep bg-bg-light">
      <div className="container-base py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-text tracking-heading">
            {profileInfo.name}
            <span className="ml-2 text-sm font-medium text-text-muted">{profileInfo.nameEn}</span>
          </p>
          <p className="text-sm text-text-muted mt-0.5">{profileInfo.tagline}</p>
        </div>
        <a
          href={`mailto:${profileInfo.email}`}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
        >
          <Mail size={15} />
          {profileInfo.email}
        </a>
      </div>
      <div className="border-t border-bg-deep">
        <div className="container-base py-4 text-center text-xs text-text-muted">
          © {new Date().getFullYear()} {profileInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
