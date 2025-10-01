// src/components/SkillIcon/SkillIcon.tsx
import { useState } from "react";
import type { Skill } from "../../types/valorant";
import styles from "./SkillIcon.module.css";
import Tooltip from "../Tooltip/Tooltip";

type Props = {
  skill: Skill;
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  isPinned?: boolean;
};

export default function SkillIcon({
  skill,
  onHover,
  onLeave,
  onClick,
  isPinned,
}: Props) {
  const [hasError, setHasError] = useState(false);

  return (
    <Tooltip label={`${skill.key}: ${skill.name}`}>
      <button
        className={`${styles.btn} ${isPinned ? styles.pinned : ""}`}
        aria-label={`${skill.key} ${skill.name}`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {!hasError && (
          <p
            className={styles.icon}
            // src={skill.icon}
            // alt={skill.name}
            onError={() => setHasError(true)}
            style={{ display: hasError ? 'none' : 'block' }}
          />
        )}
        <span className={styles.key}>{skill.key}</span>
      </button>
    </Tooltip>
  );
}