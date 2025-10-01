// src/components/AgentCard/AgentCard.tsx
import { useState, useRef, useEffect } from "react";
import styles from "./AgentCard.module.css";
import type { Agent, Skill } from "../../types/valorant";
import SkillIcon from "../SkillIcon/SkillIcon";
import InfoBar from "../InfoBar/InfoBar";
import { Link } from "react-router-dom";

type Props = { agent: Agent };

export default function AgentCard({ agent }: Props) {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [pinnedSkill, setPinnedSkill] = useState<Skill | null>(null);
  const displayedSkill = pinnedSkill ?? hoveredSkill;

  // ✅ 캐릭터 이름으로 배경 스타일 동적 클래스 지정
  const bgClassName = styles[`bg_${agent.name.toLowerCase()}`] ?? "";

  // ✅ 설명창 참조용 ref
  const hoverInfoRef = useRef<HTMLDivElement>(null);

  // ✅ 설명창 외부 클릭 시 pinnedSkill 초기화
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        pinnedSkill && // 설명창이 열려있고
        hoverInfoRef.current && // 참조 DOM이 있고
        !hoverInfoRef.current.contains(e.target as Node) // 바깥 클릭이면
      ) {
        setPinnedSkill(null); // 설명창 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pinnedSkill]);

  return (
    <section
      className={`${styles.card} ${bgClassName}`}
      aria-label={`${agent.name} 카드`}
    >
      <h2 className={styles.name}>{agent.name}</h2>

      <div className={styles.canvas}>
        {/* ✅ 왼쪽 스킬 아이콘들 */}
        <aside className={styles.leftRail} aria-label="스킬 아이콘">
          {agent.skills.map((s) => (
            <SkillIcon
              key={s.key}
              skill={s}
              onHover={() => setHoveredSkill(s)}
              onLeave={() => setHoveredSkill(null)}
              onClick={() =>
                setPinnedSkill((prev) => (prev?.key === s.key ? null : s))
              }
              isPinned={pinnedSkill?.key === s.key}
            />
          ))}
        </aside>

        {/* ✅ 중앙 캐릭터 전신 이미지 */}
        <div className={styles.centerStage}>
          <img
            className={styles.portrait}
            src={agent.portrait}
            alt={`${agent.name} 전신`}
          />
        </div>

        {/* ✅ 우측 설명창 */}
        {displayedSkill && (
          <div className={styles.hoverInfo} ref={hoverInfoRef}>
            <h4>{displayedSkill.name}</h4>
            <p>{displayedSkill.desc}</p>
          </div>
        )}

        {/* ✅ 하단 역할 / 출신지 */}
        <div className={styles.bottomBar}>
          <InfoBar
            leftLabel="역할군"
            leftValue={agent.role}
            rightLabel="출생지"
            rightValue={agent.origin}
          />
        </div>

        {/* ✅ 메인으로 돌아가기 */}
        <Link
          to="/"
          className={styles.backButton}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          ◀ 메인으로
        </Link>
      </div>
    </section>
  );
}
