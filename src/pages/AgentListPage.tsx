// src/pages/AgentListPage.tsx
import { useEffect, useState, useRef } from "react";
import { api } from "../lib/api";
import type { Agent } from "../types/valorant";
import AgentListItem from "../components/AgentListItem/AgentListItem";
import styles from "./AgentListPage.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AgentListPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api
      .get("/agents")
      .then((res) => setAgents(res.data))
      .catch(() => setAgents([]));
  }, []);

  useEffect(() => {
  if (!containerRef.current) return;

  // 기존 트리거 제거
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // 초기 스타일 강제 설정 (✅ 여기 중요)
  const cards = gsap.utils.toArray<HTMLDivElement>(
    containerRef.current.querySelectorAll(`.${styles.cardWrapper}`)
  );

  gsap.set(cards, {
    clearProps: "all", // ✅ 이전 gsap 스타일 제거
    opacity: 1,
    y: 0,
  });

  // 새로 애니메이션 등록
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

  if (!agents.length)
    return <p className={styles.loading}>에이전트 불러오는 중…</p>;

  return (
    <main ref={containerRef} className={styles.container}>
      {agents.map((agent) => (
        <div key={agent.id} className={styles.cardWrapper}>
          <AgentListItem agent={agent} />
        </div>
      ))}
    </main>
  );
}
