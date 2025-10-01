import { Routes, Route } from "react-router-dom";
import AgentListPage from "./pages/AgentListPage";
import ValorantPage from "./pages/ValorantPage";



export default function App() { //위에서 export default 추가를 시켜주면 아래에 굳이 추가시켜 줄 필요없을 뿐더러 추가를 시키면 오류가 발생한다.
  return (
    <Routes>
      <Route path="/" element={<AgentListPage />} />
      <Route path="/agents/:id" element={<ValorantPage />} />
      
    </Routes>
  );
}


