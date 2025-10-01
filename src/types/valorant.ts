export type Skill = {
  key: "Q" | "E" | "C" | "X";
  name: string;
  icon: string;
  desc: string;
};
//db.json 상위 컴포넌트로 db.json에 있는 데이터를 불러오기 위해 타입을 지정
export type Agent = {
  id: number;
  name: string;
  role: string;
  origin: string;
  portrait: string;
  skills: Skill[];
};
