# ethaneom 포트폴리오 사이트 개발 로그

> 개인 포트폴리오 홈페이지 구축 기록
> GitHub: [sendmethere/ethaneom](https://github.com/sendmethere/ethaneom)
> 배포: [ethaneom.netlify.app](https://ethaneom.netlify.app)

---

## 목차

- [[#프로젝트 개요]]
- [[#기술 스택]]
- [[#디자인 시스템]]
- [[#파일 구조]]
- [[#Notion DB 연동]]
- [[#Netlify 배포]]
- [[#섹션별 구조]]
- [[#데이터 스키마]]
- [[#정적 데이터 (profileInfo)]]
- [[#비공개 페이지]]
- [[#커밋 히스토리]]
- [[#주요 트러블슈팅]]
- [[#유지보수 가이드]]

---

## 프로젝트 개요

기존 Notion 페이지에 흩어져 있던 이력·연구·활동 정보를 하나의 포트폴리오 사이트로 통합.
모든 콘텐츠는 **Notion DB** 에서 관리하고, Netlify Functions를 프록시로 두어 API 키를 서버사이드에서만 사용.

---

## 기술 스택

| 항목 | 내용 |
|---|---|
| 번들러 | Vite 6 |
| UI 프레임워크 | React 18 (JSX only, TypeScript 미사용) |
| 라우터 | React Router DOM v6 |
| 스타일 | Tailwind CSS v3 |
| UI 컴포넌트 | Shadcn 스타일 수동 구현 (Radix 미사용) |
| 아이콘 | lucide-react |
| 서버리스 함수 | Netlify Functions (esbuild 번들) |
| 데이터 소스 | Notion API v1 |
| 배포 | Netlify (GitHub 연동 자동 배포) |
| 폰트 | Pretendard Variable (jsDelivr CDN) |

---

## 디자인 시스템

### 색상 토큰

```js
// tailwind.config.js
colors: {
  primary: {
    DEFAULT: '#76020E',   // 메인 컬러 (딥 마룬)
    dark:    '#370001',   // 호버·강조용 다크
    foreground: '#FFFFFF',
  },
  bg: {
    deep:  '#DAC8B5',     // 카드 테두리, 구분선 배경
    light: '#EDE3DA',     // 섹션 배경 (밝은 쪽)
  },
  text: {
    DEFAULT: '#222222',   // 본문
    muted:   '#6B6B6B',   // 보조 텍스트
  },
}
```

### 타이포그래피

- **폰트**: Pretendard Variable (CDN 로드)
- **letter-spacing heading**: `-0.02em`
- **line-height heading**: `1.2` / **body**: `1.7`
- CDN URL: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`

### 공통 클래스 (index.css)

```css
.section-padding  /* py-20 md:py-28 */
.container-base   /* max-w-5xl mx-auto px-6 md:px-12 */
.section-label    /* text-xs font-semibold tracking-widest text-primary uppercase */
```

---

## 파일 구조

```
ethaneom/
├── netlify/
│   └── functions/
│       └── portfolio.js        ← Notion API 프록시 (서버리스)
├── public/
│   ├── profile.png             ← 프로필 사진
│   └── contents/               ← 콘텐츠 집필 썸네일 이미지 업로드 위치
├── src/
│   ├── App.jsx                 ← 라우터 설정
│   ├── main.jsx
│   ├── index.css               ← 전역 스타일 + Pretendard CDN import
│   ├── context/
│   │   └── PortfolioContext.jsx ← Notion 데이터 fetch + 전역 공급
│   ├── data/
│   │   └── portfolio.js        ← profileInfo 정적 데이터만 보관
│   ├── pages/
│   │   ├── Home.jsx            ← 메인 페이지 (섹션 조합)
│   │   └── Skeleton.jsx        ← /skeleton 비공개 스키마 뷰
│   └── components/
│       ├── layout/
│       │   ├── Header.jsx      ← 고정 네비게이션 + 모바일 메뉴
│       │   └── Footer.jsx
│       ├── sections/
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── Awards.jsx
│       │   ├── Research.jsx    ← 연구·집필 + 스터디그룹(주석) + 관심분야
│       │   ├── Training.jsx
│       │   ├── Activities.jsx
│       │   ├── Skills.jsx
│       │   └── Content.jsx     ← 콘텐츠 집필 (썸네일 그리드)
│       └── ui/
│           ├── badge.jsx
│           ├── button.jsx
│           ├── card.jsx
│           └── separator.jsx
├── netlify.toml
├── tailwind.config.js
├── vite.config.js
├── log.md                      ← 이 파일
└── design.md                   ← 디자인 철칙 문서
```

---

## Notion DB 연동

### DB 정보

- **DB ID**: `317b09d4-0542-805c-b2e5-dcbd15257d44`
- **Notion 버전**: `2022-06-28`

### 연동 방식

```
브라우저 → /.netlify/functions/portfolio → Notion API
```

Notion API 키를 브라우저에 노출하지 않기 위해 Netlify Functions를 서버리스 프록시로 사용.

### 환경 변수

| 변수명 | 설정 위치 |
|---|---|
| `NOTION_API_KEY` | Netlify 대시보드 → Site configuration → Environment variables |

### Notion DB 속성 타입 매핑

| 속성명 | Notion 타입 | 비고 |
|---|---|---|
| `category` | Select 또는 Rich text | 항목 분류 기준 |
| `title` | Title | 항목 제목 |
| `content` | Rich text | 주요 내용 |
| `description` | Rich text | 부가 설명 |
| `date` | Date | `YYYY-MM-DD` 형식 |
| `url` | URL | 외부 링크 |
| `image` | URL | 콘텐츠 집필 썸네일 (`/contents/파일명` 또는 외부 URL) |

### 페이지네이션

Notion API 응답이 100건 제한이므로 `has_more` / `next_cursor` 기반 전체 쿼리 구현.

### 정렬

`date` 기준 내림차순 (`descending`) 정렬 후 반환.

---

## Netlify 배포

### netlify.toml 핵심 설정

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20"          # fetch API 기본 지원 버전

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200                 # React Router SPA fallback
```

### 배포 흐름

1. `main` 브랜치에 push
2. Netlify 자동 빌드 (`npm run build`)
3. `dist/` 배포 + `netlify/functions/` 서버리스 함수 등록

---

## 섹션별 구조

### Hero (`#top`)

- **데이터 소스**: `profileInfo` (정적, `src/data/portfolio.js`)
- **표시 필드**: `name`, `nameEn`, `tagline`, `email`, `photo`
- 프로필 사진 + 이름 + tagline + 이메일 버튼

### About (`#about`)

- **데이터 소스**: Notion
- `profile_education` → 학력 타임라인 (title, content, date)
- `profile_position` → 소속 카드 (content, date)

### Awards (`#awards`)

- **데이터 소스**: Notion
- `awards` → 수상 카드 그리드 (title, content, date, url)

### Research & Writing (`#research`)

- **데이터 소스**: Notion
- 탭 토글로 구분:
  - `research_paper` → 논문 (title, content, date, url)
  - `writing` → 저서 (title, content, date, url)
- 하단 구분선 이후:
  - ~~`study_group`~~ → **현재 주석 처리됨** (title, content)
  - `interests` → 관심 분야 태그 (title, content)

### Training (`#training`)

- **데이터 소스**: Notion
- `training` → 연수 목록 (title, content, date, url)

### Activities (`#activities`)

- **데이터 소스**: Notion
- `activities` → 교육 활동 목록 (content, description, date, url)
- `date` 연도별 그룹핑하여 표시

### Skills & Projects (`#skills`)

- **데이터 소스**: Notion
- `skills` → 기술 스택 뱃지 (title)
- `skills_project` → 제작 프로젝트 가로 스크롤 카드 (title, content, url)
  - 스크롤바 색상: primary(`#76020E`)
  - 스크롤바 숨김 제거, 커스텀 스타일 적용

### Content (`#content`)

- **데이터 소스**: Notion
- `content` → 콘텐츠 집필 썸네일 그리드 (title, content, url, image)
- 그리드: 모바일 2열 → 태블릿 3열 → 데스크탑 5열
- 썸네일 없을 경우 제목 앞 두 글자를 placeholder로 표시
- 이미지 파일: `public/contents/` 폴더에 업로드 후 Notion `image` 필드에 `/contents/파일명` 입력

---

## 데이터 스키마

Notion DB에서 사용하는 `category` 값 전체 목록:

| category | 사용 섹션 | 설명 |
|---|---|---|
| `profile_education` | About | 학력 |
| `profile_position` | About | 소속 |
| `awards` | Awards | 수상 경력 |
| `research_paper` | Research | 논문 |
| `writing` | Research | 저서 |
| `study_group` | Research (주석) | 스터디 그룹 |
| `interests` | Research | 연구 관심 분야 |
| `training` | Training | 연수 |
| `activities` | Activities | 교육 활동 |
| `skills` | Skills | 기술 스택 |
| `skills_project` | Skills | 제작 프로젝트 |
| `content` | Content | 콘텐츠 집필 |

---

## 정적 데이터 (profileInfo)

Notion 연동 없이 `src/data/portfolio.js`에서 직접 관리:

```js
export const profileInfo = {
  name:    '엄태상',
  nameEn:  'EOM TAE SANG',
  tagline: '증거 기반의 연구를 실천하는 교육자입니다.',
  email:   'ethaneom@korea.ac.kr',
  photo:   '/profile.png',
}
```

> tagline, 이메일 등 변경 시 이 파일을 직접 수정.

---

## 비공개 페이지

### `/skeleton`

- **URL**: `https://ethaneom.netlify.app/skeleton`
- 네비게이션에 링크 없음 (직접 URL 입력)
- 각 섹션이 어떤 `category`의 어떤 필드를 참조하는지 시각적으로 표시
- Notion 편집 시 참고용

---

## 커밋 히스토리

| 해시 | 내용 |
|---|---|
| `4e8a22b` | Study Groups 섹션 주석 처리 |
| `1b4d3ca` | 정적 portfolioItems 제거, profileInfo만 유지 |
| `d96e5b5` | interests 부제목: description → content 필드로 변경 |
| `df0de81` | `/skeleton` 비공개 스키마 참고 페이지 추가 |
| `c5d458d` | Research Interests 태그 타이틀 크기·굵기 조정 |
| `25f1e07` | Research Interests 태그에 content(영문) 부제목 표시 |
| `4270fae` | 제작 프로젝트 스크롤바 primary 색상으로 스타일링 |
| `050c2fb` | 콘텐츠 집필 카드 5열 컴팩트 레이아웃 |
| `38d493e` | Study Groups·Research Interests → Research 섹션 하단으로 이동 |
| `7ae412d` | 제작 프로젝트 카테고리 `skills` → `skills_project` 분리 |
| `9d90dc9` | 콘텐츠 집필 섹션 신설 (썸네일 지원) |
| `c120dac` | 이메일 변경 → `ethaneom@korea.ac.kr` |
| `4f69e69` | About 섹션에서 관심 분야 quick-view 제거 |
| `309b9a8` | Activities 섹션에 description 표시 |
| `63bf45a` | 제작 프로젝트 카드 가로 스크롤 + 전체 클릭 가능 |
| `76725fe` | profile 카테고리 → `profile_education` / `profile_position` 분리 |
| `7415352` | 논문/저서 탭 토글, 탭 카운트 제거, 소속 상태 표시 제거 |
| `9ba2598` | 로컬 폰트 → Pretendard CDN으로 교체 |
| `4749339` | 최초 커밋 |

---

## 주요 트러블슈팅

### Git push HTTP 400

- **원인**: 로컬 OTF 폰트 파일(~5MB 바이너리)이 포함된 채로 push
- **해결**: `.gitignore`에 `public/fonts/` 추가, Pretendard CDN으로 전환, `git config http.postBuffer 524288000` 설정

### Netlify Functions 500 오류

- **원인**: Node 버전 미지정으로 `fetch` API 미지원 버전 실행
- **해결**: `netlify.toml`에 `NODE_VERSION = "20"` 추가

### Notion API 404 `object_not_found`

- **원인**: DB ID가 잘못 하드코딩됨
- **해결**: Notion DB URL에서 실제 ID `317b09d4-0542-805c-b2e5-dcbd15257d44` 추출 후 수정

### Notion 연동 후에도 빈 화면

- **원인**: Notion 인테그레이션이 DB에 연결되지 않음
- **해결**: Notion DB 페이지 → `···` → Connections → 인테그레이션 추가

### 학력 데이터 표시 안 됨

- **원인**: 타이틀에 `'학력'` 문자열 포함 여부로 필터링하는 fragile한 패턴 사용
- **해결**: `category: 'profile_education'`으로 명시적 분리

---

## 유지보수 가이드

### 콘텐츠 수정

모든 콘텐츠는 Notion DB에서 수정. 변경 즉시 사이트에 반영됨 (CDN 캐시 최대 5분).

### 프로필 정보 수정

`src/data/portfolio.js` 파일의 `profileInfo` 객체를 직접 편집 후 push.

### 콘텐츠 집필 썸네일 추가

1. 이미지 파일을 `public/contents/` 폴더에 추가
2. `git push`
3. Notion DB의 해당 항목 `image` 필드에 `/contents/파일명.jpg` 입력

### Study Groups 섹션 복구

`src/components/sections/Research.jsx` 에서 주석(`{/* ... */}`) 해제.

### 새 섹션 추가

1. Notion DB에 새 `category` 값으로 항목 추가
2. `src/components/sections/NewSection.jsx` 생성
3. `src/pages/Home.jsx`에 import 및 배치
4. `src/components/layout/Header.jsx`의 `NAV_LINKS`에 추가
5. `src/pages/Skeleton.jsx`의 `SCHEMA` 배열에 문서 추가
