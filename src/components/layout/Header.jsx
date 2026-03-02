import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: '소개', href: '#about' },
  { label: '연구', href: '#research' },
  { label: '수상', href: '#awards' },
  { label: '연수', href: '#training' },
  { label: '활동', href: '#activities' },
  { label: '기술', href: '#skills' },
  { label: '콘텐츠', href: '#content' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection Observer for active section highlight
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-light/90 backdrop-blur-md border-b border-bg-deep shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-base flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#top"
          className="font-bold text-lg tracking-heading text-text hover:text-primary transition-colors"
        >
          엄태상
          <span className="ml-2 text-xs font-medium text-text-muted hidden sm:inline">
            EOM TAE SANG
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                active === href.slice(1)
                  ? 'text-primary bg-primary/5'
                  : 'text-text-muted hover:text-text hover:bg-bg-deep'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-text-muted hover:text-text hover:bg-bg-deep transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 열기"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-bg-light/95 backdrop-blur-md border-b border-bg-deep">
          <nav className="container-base py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  active === href.slice(1)
                    ? 'text-primary bg-primary/10'
                    : 'text-text hover:bg-bg-deep'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
