import type { PropsWithChildren } from "react";
import styles from "./Tooltip.module.css";

type Props = PropsWithChildren<{ label: string }>;

export default function Tooltip({ label, children }: Props) {
  return (
    <span className={styles.wrap}>
      {children}
      <span role="tooltip" className={styles.tip}>{label}</span>
    </span>
  );
}
