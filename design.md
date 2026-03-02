# Design System — 엄태상 포트폴리오

> 교사 연구자 엄태상의 전문성과 따뜻함을 동시에 담는 시각 언어.
> 모든 디자인 결정은 이 문서를 기준으로 한다.

---

## 1. 색상 시스템 (Color System)

### 팔레트

| 역할 | 변수명 | Hex | 용도 |
|------|--------|-----|------|
| Primary | `--color-primary` | `#76020E` | 주요 버튼, 강조 텍스트, 링크, 액센트 |
| Primary Dark | `--color-primary-dark` | `#370001` | hover 상태, 다크 포인트, 배지 배경 |
| Background Deep | `--color-bg-deep` | `#DAC8B5` | 카드 배경, 섹션 구분, 구분선 |
| Background Light | `--color-bg-light` | `#EDE3DA` | 페이지 기본 배경, 컨테이너 |
| Text | `--color-text` | `#222222` | 본문 텍스트, 제목 |
| White | `#FFFFFF` | | 버튼 내부 텍스트, 역전 요소 |

### 사용 원칙

- 페이지 기본 배경은 `#EDE3DA`, 카드/섹션 분리는 `#DAC8B5`
- `#76020E`는 포인트 컬러: 의미 있는 강조에만, 배경 전체에 절대 사용 금지
- 텍스트-배경 명암 대비는 항상 **WCAG AA (4.5:1) 이상** 유지
- Primary 계열 색상 위의 텍스트는 반드시 흰색(`#FFFFFF`)

### Tailwind 커스텀 토큰 (tailwind.config)

```js
colors: {
  primary: {
    DEFAULT: '#76020E',
    dark: '#370001',
  },
  bg: {
    deep: '#DAC8B5',
    light: '#EDE3DA',
  },
  text: {
    DEFAULT: '#222222',
  },
}
```

---

## 2. 타이포그래피 (Typography)

### 폰트

- **Primary**: `Pretendard` (로컬 포함, Google Fonts fallback)
- **Fallback**: `-apple-system, BlinkMacSystemFont, system-ui, sans-serif`
- 영문은 Pretendard가 그대로 처리, 별도 영문 폰트 불필요

### 타입 스케일

| 레벨 | Size | Weight | Line-height | 용도 |
|------|------|--------|-------------|------|
| Display | 2.5rem (40px) | 700 | 1.1 | 히어로 이름, 대형 타이틀 |
| H1 | 2rem (32px) | 700 | 1.2 | 섹션 제목 |
| H2 | 1.5rem (24px) | 600 | 1.3 | 카드 제목, 서브섹션 |
| H3 | 1.25rem (20px) | 600 | 1.4 | 소제목 |
| Body | 1rem (16px) | 400 | 1.7 | 본문 |
| Caption | 0.875rem (14px) | 400 | 1.5 | 부가 설명, 날짜 |
| Label | 0.75rem (12px) | 500 | 1.4 | 태그, 배지, 카테고리 |

### 타이포그래피 원칙

- 정의된 스케일 외의 폰트 사이즈 임의 사용 금지
- 제목 `letter-spacing: -0.02em`, 본문 `letter-spacing: 0`
- 줄바꿈 단위는 의미 단위로 (중간 절단 금지)

---

## 3. 간격 시스템 (Spacing)

8px 배수 기반. Tailwind 기본 스케일 사용.

| 토큰 | 값 | Tailwind |
|------|-----|---------|
| xs | 4px | `p-1` |
| sm | 8px | `p-2` |
| md | 16px | `p-4` |
| lg | 24px | `p-6` |
| xl | 32px | `p-8` |
| 2xl | 48px | `p-12` |
| 3xl | 64px | `p-16` |
| 4xl | 96px | `p-24` |

---

## 4. 레이아웃 (Layout)

### 컨테이너

```
max-width: 1200px
padding: 0 24px (mobile) / 0 48px (tablet+)
margin: 0 auto
```

### 그리드

- Desktop (≥1024px): 12컬럼
- Tablet (≥768px): 8컬럼
- Mobile (<768px): 4컬럼 (단일 열 스택)

### 브레이크포인트

| 이름 | 값 | Tailwind prefix |
|------|-----|----------------|
| Mobile | < 640px | (기본) |
| sm | 640px | `sm:` |
| md | 768px | `md:` |
| lg | 1024px | `lg:` |
| xl | 1280px | `xl:` |

### 레이아웃 원칙

- **Mobile First**: 기본 스타일은 모바일 기준, 큰 화면에서 확장
- 섹션 수직 여백: `py-16 md:py-24`
- 컴포넌트 간 여백: `gap-6 md:gap-8`

---

## 5. 컴포넌트 가이드 (Shadcn 기반)

### Button

```
Primary:   bg-primary text-white hover:bg-primary-dark
Secondary: border border-primary text-primary hover:bg-primary/5
Ghost:     text-primary hover:bg-bg-deep
```
- 라운드: `rounded-lg`
- 패딩: `px-6 py-2.5`
- 전환: `transition-colors duration-150`

### Card

```
배경:   bg-white 또는 bg-bg-light
테두리: border border-bg-deep (미묘하게)
그림자: shadow-sm hover:shadow-md
라운드: rounded-xl
패딩:   p-6
```
- hover 시 `translateY(-2px)` + shadow 증가
- 전환: `transition-all duration-200`

### Badge / Tag

```
카테고리:  bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium
날짜:      text-muted-foreground text-sm
상태 배지: bg-primary-dark text-white rounded-md px-2 py-0.5 text-xs
```

### Navigation

```
position: sticky top-0 z-50
배경:      bg-bg-light/80 backdrop-blur-md
테두리:    border-b border-bg-deep
활성 링크: text-primary border-b-2 border-primary
```

---

## 6. 섹션 디자인 패턴

### Hero Section

- 최소 높이: `min-h-screen`
- 구성: 이름(Display) + 역할(H2) + 한줄 소개 + CTA 버튼
- 프로필 이미지: 원형, 테두리 `ring-4 ring-primary/20`
- 배경: `bg-bg-light`

### Timeline Section (수상, 경력)

- 세로 타임라인: 왼쪽 연도/날짜 마커 + 오른쪽 카드
- 마커 색상: `bg-primary`
- 연결선: `border-l-2 border-bg-deep`

### Grid Section (기술, 관심분야)

- 반응형: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- 카드 호버: elevation + primary 테두리 subtle

### List Section (활동, 연수)

- 구분선 있는 리스트: `divide-y divide-bg-deep`
- 날짜 배지 우측 정렬
- 카테고리 태그 좌측

---

## 7. 애니메이션 & 인터랙션

### 스크롤 애니메이션

- 섹션 진입 시: `fade-in + slide-up` (translateY 20px → 0)
- 지연: 각 아이템 `0.05s` 간격 stagger
- 라이브러리: Framer Motion 또는 CSS `@keyframes`

### Hover 상태

```
버튼:   scale(1.02) + shadow-md, 150ms
카드:   translateY(-2px) + shadow-md, 200ms
링크:   color → primary-dark, 150ms
이미지: scale(1.03), 200ms
```

### 전환 기본값

```
빠름:    150ms ease
기본:    200ms ease-out
느림:    300ms ease-in-out
페이지:  400ms ease-in-out
```

### 원칙

- 애니메이션은 정보를 강화하는 수단, 주의 분산 금지
- `prefers-reduced-motion` 미디어 쿼리 반드시 적용
- 무한 루프 애니메이션 사용 금지 (로딩 스피너 제외)

---

## 8. 접근성 (Accessibility)

- 색상 대비: WCAG AA 이상 (본문 4.5:1, 대형 텍스트 3:1)
- 포커스 스타일: `ring-2 ring-primary ring-offset-2` (outline 제거 금지)
- 의미론적 HTML: `<article>`, `<section>`, `<nav>`, `<main>`, `<header>`, `<footer>`
- 이미지 `alt` 텍스트 필수 (장식용은 `alt=""`)
- 키보드 내비게이션 완전 지원

---

## 9. 콘텐츠 원칙

### 어조

- 전문적이되 따뜻하게
- 자기과시보다 기여와 연구 중심으로 서술
- 한국어 기본, 학술/기술 용어는 영문 병기 허용

### 정보 구조 우선순위

1. 현재 역할 & 연구 관심사
2. 수상 & 연구 실적
3. 교육 활동 & 연수
4. 기술 스킬 & 프로젝트
5. 스터디 & 커뮤니티

---

## 10. Do & Don't

### ✅ Do

- 베이지 톤 배경을 일관성 있게 유지
- 카테고리별 명확한 시각적 분리
- 정의된 컬러 토큰만 사용
- 컴포넌트 재사용 우선 (새 컴포넌트 최소화)
- Mobile-first로 개발 후 desktop 확장

### ❌ Don't

- `#76020E` Primary 색상을 넓은 배경에 사용
- 정의 외 임의 색상 하드코딩
- 동일 화면에 3가지 이상 애니메이션 동시 실행
- 타입 스케일 무시하고 임의 폰트 사이즈 사용
- 접근성 무시한 색상만 의존 정보 전달

---

*Last updated: 2026-03-02*
