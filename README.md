# Valorant Agent Carousel

## 프로젝트 개요
발로란트 캐릭터 카드들을 보여주는 React + TypeScript 기반 웹 애플리케이션입니다.  
캐릭터별 스킬과 정보를 카드 형태로 출력하며, JSON Server를 이용해 Mock API를 제공합니다. 

## 실행 방법
1. 저장소 클론
   ```bash
   git clone https://github.com/사용자명/valorant-agents.git
  
   cd valorant-agents

   npm install

   npm run dev

   cd mock
   
   npx json-server --watch db.json --port 4000
   ```   

   ## 🛠 기술 스택
- React + TypeScript
- Vite
- CSS Modules
- JSON Server

## 🎨 기술적 특징
- **GSAP(ScrollTrigger, Draggable)**를 활용한 캐러셀 애니메이션
  - 드래그 기반 3D 캐러셀 인터랙션
  - 스크롤 시 카드 전환 및 자연스러운 모션
``` tsx
 useEffect(() => {
  if (!containerRef.current) return;

  // 기존 트리거 제거
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // 초기 스타일 강제 설정 (✅ 여기 중요)
  const cards = gsap.utils.toArray<HTMLDivElement>(
    containerRef.current.querySelectorAll(`.${styles.cardWrapper}`)
  );

  gsap.set(cards, {
    clearProps: "all", 
    opacity: 1,
    y: 0,
  });

  gsap.from(cards, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top 80%",
    },
  });
}, [agents]);
```

- 일부 UI 효과는 **순수 CSS만으로 구현**
  - `:hover` 시 스킬 설명 Tooltip 표시
  - 클릭 시 설명 창 고정 및 해제
  - `transition`, `transform`으로 카드/아이콘 애니메이션 처리
- **컴포넌트 구조화**
  - `AgentCard` → 캐릭터 카드 전체 UI
  - `SkillIcon` → 스킬 아이콘 및 설명 Tooltip
  - `Tooltip` → 스킬 이름/설명 표시
- 반응형 레이아웃
  - Flexbox + Grid로 모바일/데스크탑 환경 대응하는 CSS
```CSS
.container {
  display: grid;                     /* ✅ grid 사용 */
  grid-template-columns: 1fr;        /* 기본은 한 줄 (모바일) */
  gap: 20px;                         /* 카드 사이 간격 */
  padding: 40px 20px;
  width: 100%;
  max-width: 1200px;                 /* 가운데 정렬 */
  margin: 0 auto;
}

/* 태블릿 이상: 2열 */
@media (min-width: 600px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 데스크탑 이상: 3열 */
@media (min-width: 900px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```
- 각각에 캐릭터에 배경이 된 css제작은 
[CSS Gradient](https://cssgradient.io/)라는 곳에서 제작 직접 설정하며 제작 하였다!



