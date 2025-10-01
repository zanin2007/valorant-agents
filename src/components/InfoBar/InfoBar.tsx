import styles from "./InfoBar.module.css";

type Props = {
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
};

export default function InfoBar({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: Props) {
  return (
    <div className={styles.wrap}>{/* .wrap이런거는 css 적용을 하기위해 쓰임 */}
      <div className={styles.item}>
        <span>{leftLabel}</span>
        <span className={styles.value}>{leftValue}</span>
      </div>
      <div className={styles.item}>
        <span>{rightLabel}</span>
        <span className={styles.value}>{rightValue}</span>
      </div>
    </div>
  );
}
