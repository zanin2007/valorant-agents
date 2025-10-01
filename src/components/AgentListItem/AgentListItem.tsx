// src/components/AgentListItem/AgentListItem.tsx

import { Link } from "react-router-dom";
import styles from "./AgentListItem.module.css";
import type { Agent } from "../../types/valorant";
import { useInView } from "react-intersection-observer"; // ✅ 추가

type Props = { agent: Agent };

export default function AgentListItem({ agent }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: false, // ✅ 여러 번 실행 가능하게 수정
    threshold: 0.1,
  });

  return (
    <Link
      ref={ref}
      to={`/agents/${agent.id}`}
      className={`${styles.card} ${inView ? styles.animate : styles.hidden}`}
    >
      <img
        className={styles.portrait}
        src={agent.portrait}
        alt={`${agent.name} 이미지`}
      />
      <div className={styles.info}>
        <h3 className={styles.name}>{agent.name}</h3>
        <div className={styles.meta}>
          <span>{agent.role}</span>
          <span>{agent.origin}</span>
        </div>
      </div>
    </Link>
  );
}
