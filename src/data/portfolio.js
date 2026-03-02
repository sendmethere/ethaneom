/**
 * 포트폴리오 정적 데이터
 * Notion DB (317b09d4-0542-80cd-953a-000bdac6eab5) migrate.csv 기반
 * 추후 Notion API 연동 시 이 파일 대신 src/hooks/useNotion.js 를 사용
 *
 * DB 스키마: category | title | content | description | date | url
 */

export const profileInfo = {
  name: '엄태상',
  nameEn: 'EOM TAE SANG',
  tagline: '증거가 바꾸는 교실을 꿈꾸는 교사 연구자입니다.',
  email: 'sendmethere@naver.com',
  photo: '/profile.png',
}

export const portfolioItems = [
  // ── profile ─────────────────────────────────
  {
    category: 'profile',
    title: '자기소개',
    content: '증거가 바꾸는 교실을 꿈꾸는 교사 연구자입니다.',
    description: '교사 연구자 한줄 소개',
    date: null,
    url: null,
  },
  {
    category: 'profile',
    title: '학력 — 학부',
    content: '전주교육대학교 초등교육과(음악교육심화전공) 졸업',
    description: '전주교육대학교 초등교육과 졸업',
    date: '2017-02-21',
    url: null,
  },
  {
    category: 'profile',
    title: '학력 — 석사',
    content:
      '전주교육대학교 교육대학원 초등교육학과 창의정보융합교육 전공 석사 졸업 (지도교수: 이용배). 졸업논문: 공동설계 기법을 활용한 교육용 게임 개발에 대한 연구 (A Study on the Development of Educational Games Using Co-Design Techniques)',
    description: '전주교육대학교 교육대학원 석사 졸업',
    date: '2023-08-23',
    url: null,
  },
  {
    category: 'profile',
    title: '재직',
    content: '전북특별자치도교육청 초등교사 (초등정교사 1급)',
    description: '전북특별자치도교육청 초등교사',
    date: '2018-03-02',
    url: null,
  },

  // ── awards ──────────────────────────────────
  {
    category: 'awards',
    title: '교육부장관 표창',
    content: '디지털교육전환담당관 부총리 겸 교육부장관 표창 (디지털교육혁신 유공)',
    description: '교육부장관 표창, 디지털교육혁신 유공',
    date: '2024-12-01',
    url: null,
  },
  {
    category: 'awards',
    title: 'KERIS 우수 실증 사례 공모전 우수상',
    content: 'KERIS 우수 실증 사례 공모전 우수상 (팀-Good Evidence)',
    description: 'KERIS 공모전 우수상',
    date: '2024-12-01',
    url: null,
  },
  {
    category: 'awards',
    title: '미래엔 우석교사상',
    content: '미래엔 제 1회 우석교사상 수상 (미래엔 10대 교사상)',
    description: '미래엔 제1회 우석교사상',
    date: '2024-07-01',
    url: null,
  },
  {
    category: 'awards',
    title: '수업혁신사례연구대회 입상',
    content: '수업혁신사례연구대회 입상 (전북, 2등급)',
    description: '전북 수업혁신사례연구대회 2등급 입상',
    date: '2024-08-01',
    url: null,
  },

  // ── research ────────────────────────────────
  {
    category: 'research',
    title: '논문 — 수업 실연 영상 AI 평가 일치도',
    content:
      '엄태상, 장채원, & 임태형. (2025). "수업 실연 영상에 대한 인간 교사와 AI의 평가 일치도 연구." 교육정보미디어연구 31(4) 1681-1701.',
    description: '수업 실연 영상에 대한 인간 교사와 AI의 평가 일치도 연구, 교육정보미디어연구',
    date: '2025-01-01',
    url: 'http://dx.doi.org/10.15833/KAFEIAM.31.4.1681',
  },
  {
    category: 'research',
    title: '저서 — 교사들의 에듀테크 활용 바이블',
    content: '《교사들의 에듀테크 활용 바이블》(잇플ITple) 공저 (대표저자)',
    description: '교사들의 에듀테크 활용 바이블 공저',
    date: null,
    url: null,
  },

  // ── training ────────────────────────────────
  {
    category: 'training',
    title: '교실혁명 선도교사 양성과정 주강사',
    content: '교실혁명 선도교사 양성과정 주강사 (네패스, 전주교대) (2024–2025)',
    description: '교실혁명 선도교사 양성과정 주강사',
    date: '2024-01-01',
    url: null,
  },
  {
    category: 'training',
    title: 'KERIS 에듀테크 노하우북 집필',
    content:
      'KERIS [초등] 《디지털 선도학교 현장지원단이 알려주는 AI 코스웨어 등 에듀테크 도입·활용 노하우북》 집필 참여',
    description: 'KERIS 에듀테크 노하우북 집필 참여',
    date: null,
    url: null,
  },
  {
    category: 'training',
    title: '전북교육연수원 웨일스페이스 연수',
    content: '전북교육연수원 《처음 만나는 웨일스페이스》 주강사 (원격연수)',
    description: '전북교육연수원 웨일스페이스 원격연수 주강사',
    date: null,
    url: null,
  },
  {
    category: 'training',
    title: '아이스크림연수원 AI 코스웨어 에듀테크',
    content:
      '아이스크림연수원 원격연수과정 《수업활용 1000% AI 코스웨어로 완성하는 에듀테크》 (2024) 강사 — FigJam / Slido 파트',
    description: 'AI 코스웨어 에듀테크 원격연수 강사',
    date: '2024-01-01',
    url: null,
  },
  {
    category: 'training',
    title: '아이스크림연수원 코들 활용 정보교육',
    content:
      '아이스크림연수원 원격연수과정 《똑똑한 실과-정보 수업 도구! AI 코스웨어 코들》 (2024) 강사 — 코들 활용 초등 정보교육',
    description: '코들 활용 초등 정보교육 원격연수 강사',
    date: '2024-01-01',
    url: null,
  },

  // ── activities ──────────────────────────────
  {
    category: 'activities',
    title: "디자인씽킹 연구회 '디디씽스쿨' 대표 교사",
    content: "전국단위 수업평가연구회(교육부, EBS) 디자인씽킹 연구회 '디디씽스쿨' 대표 교사",
    description: '전국단위 디자인씽킹 연구회 대표 교사',
    date: '2025-01-01',
    url: null,
  },
  {
    category: 'activities',
    title: '전북교육청 수업혁신 지원단',
    content: '전북특별자치도교육청 수업혁신 지원단 (리더교사)',
    description: '전북교육청 수업혁신 지원단 리더교사',
    date: '2025-01-01',
    url: null,
  },
  {
    category: 'activities',
    title: 'KERIS TOUCH 교사단 2기',
    content: 'KERIS TOUCH 교사단 2기 (2024~)',
    description: 'KERIS TOUCH 교사단 2기',
    date: '2024-01-01',
    url: null,
  },
  {
    category: 'activities',
    title: '전주교육지원청 정보교육지원단',
    content: '전주교육지원청 정보교육지원단 (2023~2024)',
    description: '전주교육지원청 정보교육지원단',
    date: '2023-01-01',
    url: null,
  },
  {
    category: 'activities',
    title: '에듀테크 실증연구 교사 모임 대표',
    content: '전국단위 에듀테크 실증연구 교사 모임 대표 교사 (2023~)',
    description: '전국단위 에듀테크 실증연구 교사 모임 대표',
    date: '2023-01-01',
    url: null,
  },
  {
    category: 'activities',
    title: '교육부 AI디지털교과서 국민 디자인단',
    content: '교육부 AI디지털교과서 국민 디자인단 (2023)',
    description: '교육부 AI디지털교과서 국민 디자인단',
    date: '2023-01-01',
    url: null,
  },
  {
    category: 'activities',
    title: 'KERIS TOUCH 현장 지원단 1기',
    content: 'KERIS TOUCH 현장 지원단 1기 (2023~)',
    description: 'KERIS TOUCH 현장 지원단 1기',
    date: '2023-01-01',
    url: null,
  },
  {
    category: 'activities',
    title: '전북교육청 에듀테크선도교사단',
    content: '전북특별자치도교육청 에듀테크선도교사단 (2023~)',
    description: '전북교육청 에듀테크선도교사단',
    date: '2023-01-01',
    url: null,
  },
  {
    category: 'activities',
    title: '전북교육청 에듀테크 큐레이터 교사단',
    content: '전북특별자치도교육청 에듀테크 큐레이터 교사단 (2023)',
    description: '전북교육청 에듀테크 큐레이터 교사단',
    date: '2023-01-01',
    url: null,
  },

  // ── skills ──────────────────────────────────
  {
    category: 'skills',
    title: 'ReactJS',
    content: 'ReactJS를 활용한 웹 프론트엔드 개발',
    description: 'ReactJS 웹 개발',
    date: null,
    url: null,
  },
  {
    category: 'skills',
    title: 'Python & Django',
    content: 'Python, Django를 활용한 웹 백엔드 개발',
    description: 'Python & Django 웹 개발',
    date: null,
    url: null,
  },
  {
    category: 'skills',
    title: '탐탐몬',
    content: '개념기반탐구 수업 도구 《탐탐몬》',
    description: '개념기반탐구 수업 도구',
    date: null,
    url: 'https://tamtammon.netlify.app',
  },
  {
    category: 'skills',
    title: '메모몬',
    content: '교실용 메모 도구 《메모몬》',
    description: '교실용 메모 도구',
    date: null,
    url: 'https://eomssam-memo.netlify.app',
  },
  {
    category: 'skills',
    title: '마이리틀랩',
    content: '현장연구 지원 도구 《마이리틀랩》 (교실혁명연수용)',
    description: '현장연구 지원 도구',
    date: null,
    url: 'https://mylittlelab.netlify.app/',
  },

  // ── study_group ─────────────────────────────
  {
    category: 'study_group',
    title: 'JEWELS 스터디',
    content: '학습과학 연구 스터디 JEWELS 스터디 리더',
    description: '학습과학 연구 스터디 JEWELS 리더',
    date: null,
    url: null,
  },
  {
    category: 'study_group',
    title: 'STELA LA4T 스터디',
    content: '학습분석 연구자 커뮤니티 STELA — 《교사를 위한 학습분석학 : LA4T》 스터디 리더',
    description: '학습분석 STELA LA4T 스터디 리더',
    date: null,
    url: null,
  },
  {
    category: 'study_group',
    title: '쪼랩 REACT 스터디',
    content: '교사 개발자 커뮤니티 쪼랩 — 《쪼랩의 REACT — 쪼리》 스터디 리더',
    description: '교사 개발자 커뮤니티 쪼랩 리더',
    date: null,
    url: null,
  },

  // ── interests ───────────────────────────────
  {
    category: 'interests',
    title: '설계-개발 연구',
    content: '설계-개발 연구 (Design & Development Research)',
    description: '설계-개발 연구',
    date: null,
    url: null,
  },
  {
    category: 'interests',
    title: 'AI 활용 교육',
    content: 'AI 활용 교육 (AI Education)',
    description: 'AI 활용 교육',
    date: null,
    url: null,
  },
  {
    category: 'interests',
    title: '학습과학',
    content: '학습과학 (Learning Science)',
    description: '학습과학',
    date: null,
    url: null,
  },
  {
    category: 'interests',
    title: '교실 오케스트레이션',
    content: '교실 오케스트레이션 (Classroom Orchestration)',
    description: '교실 오케스트레이션',
    date: null,
    url: null,
  },
]

/** 카테고리별 필터 헬퍼 */
export function getByCategory(category) {
  return portfolioItems.filter((item) => item.category === category)
}
