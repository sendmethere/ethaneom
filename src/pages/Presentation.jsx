/**
 * /presentation — PPT 삽입용 경력 장표 생성기 (비공개)
 */
import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas-pro'
import { usePortfolio } from '@/context/PortfolioContext'
import { profileInfo } from '@/data/portfolio'
import { Printer, Image } from 'lucide-react'

// ── 테마 프리셋 ────────────────────────────────────────────────
const THEMES = [
  {
    name: '포트폴리오',
    bg: '#EDE3DA', leftBg: '#76020E', leftText: '#FFFFFF',
    leftMuted: 'rgba(255,255,255,0.65)', accent: '#76020E',
    text: '#222222', muted: '#6B6B6B',
    border: 'rgba(118,2,14,0.2)', sectionBg: 'rgba(118,2,14,0.06)',
    logoBlend: 'screen',
  },
  {
    name: '화이트',
    bg: '#FFFFFF', leftBg: '#370001', leftText: '#FFFFFF',
    leftMuted: 'rgba(255,255,255,0.65)', accent: '#76020E',
    text: '#222222', muted: '#888888',
    border: 'rgba(0,0,0,0.12)', sectionBg: 'rgba(0,0,0,0.03)',
    logoBlend: 'screen',
  },
  {
    name: '노션',
    bg: '#FFFFFF', leftBg: '#F7F6F3', leftText: '#37352F',
    leftMuted: '#9B9A97', accent: '#2E2E2E',
    text: '#37352F', muted: '#9B9A97',
    border: 'rgba(55,53,47,0.16)', sectionBg: 'rgba(55,53,47,0.04)',
    logoBlend: 'multiply',
  },
  {
    name: '다크',
    bg: '#1C1C1E', leftBg: '#2C2C2E', leftText: '#F5F5F5',
    leftMuted: '#A0A0A0', accent: '#FF6B6B',
    text: '#F5F5F5', muted: '#A0A0A0',
    border: 'rgba(255,107,107,0.25)', sectionBg: 'rgba(255,107,107,0.07)',
    logoBlend: 'screen',
  },
  {
    name: '미드나잇',
    bg: '#0F172A', leftBg: '#1E293B', leftText: '#E2E8F0',
    leftMuted: '#94A3B8', accent: '#38BDF8',
    text: '#E2E8F0', muted: '#94A3B8',
    border: 'rgba(56,189,248,0.2)', sectionBg: 'rgba(56,189,248,0.05)',
    logoBlend: 'screen',
  },
]

const LOGOS = [
  { value: 'color', label: '컬러', src: '/korea-univ.png' },
  { value: 'white', label: '화이트', src: '/korea-univ-white.png' },
]

const LAYOUTS = [
  { value: 'box',  label: '박스' },
  { value: 'card', label: '둥근 카드' },
  { value: 'flat', label: '논박스' },
]

const CONTENT_SECTIONS = [
  { key: 'education',  label: '학력',           cats: ['profile_education'] },
  { key: 'position',   label: '소속',           cats: ['profile_position'] },
  { key: 'awards',     label: '수상 경력',      cats: ['awards'] },
  { key: 'research',   label: '연구 및 집필',   cats: ['research_paper', 'writing'] },
  { key: 'training',   label: '연수',           cats: ['training'] },
  { key: 'activities', label: '교육 관련 활동', cats: ['activities'] },
]

// ── localStorage 헬퍼 ─────────────────────────────────────────
const LS_KEY = 'pres_state'

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function getInit(key, fallback) {
  const s = loadState()
  return s[key] !== undefined ? s[key] : fallback
}

// ── 유틸 ──────────────────────────────────────────────────────
function formatYear(d) { return d ? d.slice(0, 4) : null }

function getItemLabel(item, cat) {
  if (cat === 'awards' || cat === 'training') return item.title
  if (cat === 'research_paper' || cat === 'writing')
    return item.title.replace(/^(논문|저서)[—\-–] ?/, '').trim()
  return item.content ?? item.title
}

function getItemSub(item) {
  const cat = item._cat
  if (cat === 'awards')    return item.content || null
  if (cat === 'training')  return item.content || null
  if (cat === 'research_paper' || cat === 'writing') return item.content || null
  if (cat === 'activities')       return item.description || null
  if (cat === 'profile_education') return item.description || null
  return null
}

// ── 섹션 블록 ─────────────────────────────────────────────────
function SlideSection({ label, cats, theme, layout, showYear, getByCategory }) {
  const items = cats.flatMap((cat) =>
    getByCategory(cat).map((item) => ({ ...item, _cat: cat }))
  )
  if (!items.length) return null

  const wrapStyle = {
    box:  { border: `1px solid ${theme.border}`, background: theme.sectionBg, borderRadius: '4px', padding: '8px 10px', marginBottom: '8px' },
    card: { background: theme.sectionBg, borderRadius: '10px', padding: '8px 10px', marginBottom: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
    flat: { borderLeft: `3px solid ${theme.accent}`, paddingLeft: '10px', marginBottom: '16px' },
  }[layout]

  return (
    <div style={wrapStyle}>
      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.accent, marginBottom: '5px' }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {items.slice(0, 5).map((item, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', minWidth: 0 }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: theme.accent, flexShrink: 0, marginTop: '5px' }} />
                <span style={{ fontSize: '11px', color: theme.text, lineHeight: 1.45, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                  {item._cat === 'profile_education' && item.title && (
                    <strong style={{ fontWeight: 700, marginRight: '5px' }}>{item.title}</strong>
                  )}
                  {getItemLabel(item, item._cat)}
                </span>
              </div>
              {showYear && item.date && (
                <span style={{ fontSize: '9px', color: theme.muted, flexShrink: 0 }}>
                  {formatYear(item.date)}
                </span>
              )}
            </div>
            {getItemSub(item) && (
              <p style={{ fontSize: '9px', color: theme.muted, lineHeight: 1.4, paddingLeft: '9px', marginTop: '1px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                {getItemSub(item)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 컨트롤 토글 버튼 ──────────────────────────────────────────
function Toggle({ label, active, onChange }) {
  return (
    <button
      onClick={() => onChange(!active)}
      className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${active ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
    >
      {label}
    </button>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export default function Presentation() {
  const { getByCategory } = usePortfolio()

  // ── state (localStorage 초기값) ───────────────────────────
  const [themeIdx,     setThemeIdx]     = useState(() => getInit('themeIdx', 1))
  const [layout,       setLayout]       = useState(() => getInit('layout', 'flat'))
  const [selected,     setSelected]     = useState(() => getInit('selected', ['education', 'position', 'research', 'activities']))
  const [showLogo,     setShowLogo]     = useState(() => getInit('showLogo', true))
  const [logoKey,      setLogoKey]      = useState(() => getInit('logoKey', 'white'))
  const [logoOpacity,  setLogoOpacity]  = useState(() => getInit('logoOpacity', 50))
  const [showYear,     setShowYear]     = useState(() => getInit('showYear', true))
  const [contact,      setContact]      = useState(() => getInit('contact', ''))
  const [extra,        setExtra]        = useState(() => getInit('extra', ''))
  const [showEmail,    setShowEmail]    = useState(() => getInit('showEmail', true))
  const [showContact,  setShowContact]  = useState(() => getInit('showContact', true))
  const [showTagline,  setShowTagline]  = useState(() => getInit('showTagline', true))
  const [showExtra,    setShowExtra]    = useState(() => getInit('showExtra', true))
  const [exporting,    setExporting]    = useState(false)

  // ── localStorage 저장 ────────────────────────────────────
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({
      themeIdx, layout, selected, showLogo, logoKey, logoOpacity,
      showYear, contact, extra, showEmail, showContact, showTagline, showExtra,
    }))
  }, [themeIdx, layout, selected, showLogo, logoKey, logoOpacity,
      showYear, contact, extra, showEmail, showContact, showTagline, showExtra])

  const theme     = THEMES[themeIdx]
  const logoSrc   = LOGOS.find((l) => l.value === logoKey)?.src ?? LOGOS[0].src
  const logoBlend = logoKey === 'white' ? 'normal' : theme.logoBlend

  const containerRef = useRef(null)
  const slideRef     = useRef(null)

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !slideRef.current) return
      const scale = containerRef.current.offsetWidth / 960
      slideRef.current.style.transform = `scale(${scale})`
      containerRef.current.style.height = `${540 * scale}px`
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const toggleSection = (key) =>
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key])

  const exportPng = async () => {
    if (!slideRef.current || !containerRef.current) return
    setExporting(true)
    const el = slideRef.current
    const container = containerRef.current
    const prevTransform = el.style.transform
    const prevHeight    = container.style.height
    try {
      el.style.transform    = 'scale(1)'
      container.style.height = '540px'
      await new Promise((r) => requestAnimationFrame(r))
      const canvas = await html2canvas(el, { scale: 2, width: 960, height: 540, useCORS: true, allowTaint: false, logging: false, backgroundColor: null })
      const link = document.createElement('a')
      link.download = 'presentation.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      el.style.transform    = prevTransform
      container.style.height = prevHeight
      setExporting(false)
    }
  }

  const selectedSections = CONTENT_SECTIONS.filter((s) => selected.includes(s.key))
  const position = getByCategory('profile_position')[0]

  return (
    <>
      <style>{`
        @media print {
          @page { size: 960px 540px landscape; margin: 0; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body > * { display: none !important; }
          #slide-print-target { display: flex !important; position: fixed !important; inset: 0 !important; transform: none !important; width: 960px !important; height: 540px !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100">
        {/* ── 컨트롤 패널 ── */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-5xl mx-auto">

            {/* 상단 헤더 */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-mono text-gray-400 mb-0.5">🔒 internal</p>
                <h1 className="text-lg font-bold text-gray-900">Presentation Builder</h1>
              </div>
              <div className="flex gap-2">
                <button onClick={exportPng} disabled={exporting} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
                  <Image size={15} />
                  {exporting ? '저장 중…' : 'PNG 저장'}
                </button>
                <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                  <Printer size={15} />
                  PDF 저장
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-5">

              {/* 테마 */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">테마</p>
                <div className="flex gap-2 mt-1">
                  {THEMES.map((t, i) => (
                    <button key={t.name} onClick={() => setThemeIdx(i)} title={t.name}
                      className={`relative h-8 w-8 rounded-full border-2 transition-all ${themeIdx === i ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                      style={{ background: `linear-gradient(135deg, ${t.leftBg} 50%, ${t.bg} 50%)` }}
                    >
                      {themeIdx === i && <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 whitespace-nowrap">{t.name}</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* 레이아웃 */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">레이아웃</p>
                <div className="flex gap-2">
                  {LAYOUTS.map((l) => (
                    <button key={l.value} onClick={() => setLayout(l.value)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${layout === l.value ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 연도 */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">연도</p>
                <Toggle label={showYear ? '표시 중' : '숨김'} active={showYear} onChange={setShowYear} />
              </div>

              {/* 기관 로고 */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">기관 로고</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <Toggle label="고려대학교" active={showLogo} onChange={setShowLogo} />
                  {showLogo && (
                    <>
                      <div className="flex gap-1">
                        {LOGOS.map((l) => (
                          <button key={l.value} onClick={() => setLogoKey(l.value)}
                            className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors ${logoKey === l.value ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                            {l.label}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">불투명도</span>
                        <input type="range" min="5" max="70" step="5" value={logoOpacity} onChange={(e) => setLogoOpacity(Number(e.target.value))} className="w-24 accent-gray-900" />
                        <span className="text-xs text-gray-500 w-7">{logoOpacity}%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 표시 섹션 */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">표시 섹션</p>
                <div className="flex flex-wrap gap-2">
                  {CONTENT_SECTIONS.map((s) => (
                    <label key={s.key} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer transition-colors select-none ${selected.includes(s.key) ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                      <input type="checkbox" className="sr-only" checked={selected.includes(s.key)} onChange={() => toggleSection(s.key)} />
                      {s.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* 좌측 패널 표시 항목 */}
              <div className="w-full border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold text-gray-500 mb-3">좌측 패널</p>
                <div className="flex flex-wrap gap-4 items-start">

                  {/* 이메일 */}
                  <div className="flex flex-col gap-1.5">
                    <Toggle label="이메일" active={showEmail} onChange={setShowEmail} />
                  </div>

                  {/* 연락처 */}
                  <div className="flex flex-col gap-1.5">
                    <Toggle label="연락처" active={showContact} onChange={setShowContact} />
                    {showContact && (
                      <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-44 px-2.5 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                      />
                    )}
                  </div>

                  {/* 태그라인 */}
                  <div className="flex flex-col gap-1.5">
                    <Toggle label="태그라인" active={showTagline} onChange={setShowTagline} />
                  </div>

                  {/* 추가 표시란 */}
                  <div className="flex flex-col gap-1.5">
                    <Toggle label="추가 표시" active={showExtra} onChange={setShowExtra} />
                    {showExtra && (
                      <input
                        type="text"
                        value={extra}
                        onChange={(e) => setExtra(e.target.value)}
                        placeholder="추가로 표시할 내용"
                        className="w-56 px-2.5 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                      />
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── 슬라이드 프리뷰 ── */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div ref={containerRef} className="w-full overflow-hidden">
            <div
              id="slide-print-target"
              ref={slideRef}
              style={{
                width: '960px', height: '540px', transformOrigin: 'top left',
                display: 'flex',
                fontFamily: "'Pretendard Variable', Pretendard, -apple-system, sans-serif",
                backgroundColor: theme.bg, overflow: 'hidden',
              }}
            >
              {/* 좌측 1/3 */}
              <div style={{ width: '300px', flexShrink: 0, backgroundColor: theme.leftBg, padding: '40px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                {/* 상단 */}
                <div>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', marginBottom: '20px', border: `3px solid ${theme.leftMuted}` }}>
                    <img src={profileInfo.photo} alt={profileInfo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <p style={{ fontSize: '26px', fontWeight: 800, color: theme.leftText, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '4px' }}>
                    {profileInfo.name}
                  </p>
                  <p style={{ fontSize: '11px', fontWeight: 500, color: theme.leftMuted, letterSpacing: '0.1em', marginBottom: '14px' }}>
                    {profileInfo.nameEn}
                  </p>

                  {position && (
                    <p style={{ fontSize: '11px', color: theme.leftText, lineHeight: 1.5, marginBottom: '4px', opacity: 0.9 }}>
                      {position.content}
                    </p>
                  )}

                  {showEmail && (
                    <p style={{ fontSize: '12px', color: theme.leftMuted, marginBottom: contact && showContact ? '2px' : '16px' }}>
                      {profileInfo.email}
                    </p>
                  )}

                  {showContact && contact && (
                    <p style={{ fontSize: '12px', color: theme.leftMuted, marginBottom: '16px' }}>
                      {contact}
                    </p>
                  )}

                  {(showEmail || (showContact && contact)) && (
                    <div style={{ width: '32px', height: '2px', background: theme.leftMuted, marginBottom: '14px', opacity: 0.5 }} />
                  )}

                  {showTagline && (
                    <p style={{ fontSize: '11px', color: theme.leftMuted, lineHeight: 1.6, marginBottom: showExtra && extra ? '8px' : '0' }}>
                      {profileInfo.tagline}
                    </p>
                  )}

                  {showExtra && extra && (
                    <p style={{ fontSize: '11px', color: theme.leftMuted, lineHeight: 1.6 }}>
                      {extra}
                    </p>
                  )}
                </div>

                {/* 하단: 로고 */}
                <div>
                  {showLogo && (
                    <img src={logoSrc} alt="Korea University"
                      style={{ width: '110px', opacity: logoOpacity / 100, display: 'block', marginTop: '16px', mixBlendMode: logoBlend }}
                    />
                  )}
                </div>
              </div>

              {/* 우측 2/3 */}
              <div style={{ flex: 1, padding: '36px 32px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {selectedSections.length === 0 ? (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontSize: '13px', color: theme.muted }}>좌측에서 표시할 섹션을 선택하세요</p>
                  </div>
                ) : (
                  selectedSections.map((sec) => (
                    <SlideSection
                      key={sec.key} label={sec.label} cats={sec.cats}
                      theme={theme} layout={layout} showYear={showYear}
                      getByCategory={getByCategory}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-400 text-center">
            960 × 540px (16:9) · PDF 저장 시 브라우저 인쇄에서 "배경 그래픽" 옵션을 켜세요
          </p>
        </div>
      </div>
    </>
  )
}
