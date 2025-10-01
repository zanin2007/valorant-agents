import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; 
import { API_BASE } from "../lib/api";
import type { Agent } from "../types/valorant";
import AgentCard from "../components/AgentCard/AgentCard";

export default function ValorantPage() {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${API_BASE}/agents/${id}`)
      .then((res) => setAgent(res.data))
      .catch(() => setAgent(null));
  }, [id]);

  if (!agent) return <div style={{ padding: 20 }}>에이전트 로딩 중...</div>;

  return (
    <main style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <AgentCard agent={agent} />
    </main>
  );
}
