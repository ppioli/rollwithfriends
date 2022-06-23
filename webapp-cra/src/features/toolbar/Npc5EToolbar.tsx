import { PreloadedQuery } from "react-relay";

const graphql = require("babel-plugin-relay/macro");

export interface Npc5EToolbarSingleProps {
  query: PreloadedQuery<any>;
}

export function Npc5EToolbarMulti() {
  return null;
}
//
// export function Npc5EToolbarSingle({ query }: Npc5EToolbarSingleProps) {
//   // const data = usePreloadedQuery<Npc5EToolbarQueryType>(
//   //   Npc5EToolbar_scene,
//   //   query
//   // );
//
//   return (
//     <Suspense fallback={"Loading"}>
//       <Npc5EToolbarBase data={data} />;
//     </Suspense>
//   );
// }
//
// interface Npc5eToolbarBase {
//   data: Npc5EToolbarQuery$data | null;
// }
//
// function Npc5EToolbarBase({ data }: Npc5eToolbarBase) {
//   console.log(data);
//   return (
//     <div className={"bg-dark w-full h-32"}>
//       <div>{data?.node?.name ?? ""}</div>
//       <div>{data?.node?.type?.label ?? ""}</div>
//       <button type={"button"} className={"btn btn-primary"}>
//         Tool
//       </button>
//       <button type={"button"} className={"btn btn-primary"}>
//         Bar
//       </button>
//       <button type={"button"} className={"btn btn-primary"}>
//         Bar
//       </button>
//     </div>
//   );
// }
