
import BattleMap from "components/battleMap/BattleMap";
import {
  SelectedScene_scene$data,
  SelectedScene_scene$key
} from "features/scene/__generated__/SelectedScene_scene.graphql";
import { HTMLProps } from "react";
import {useFragment, graphql} from "react-relay"
import { useResizeDetector } from "react-resize-detector";

export interface SceneProps {
  id: string,
  scene: SelectedScene_scene$key,
  container?: HTMLProps<HTMLDivElement>
}

export function SelectedScene({scene, container}: SceneProps){

  const { ref, width, height } = useResizeDetector();

  const data: SelectedScene_scene$data = useFragment(
    graphql`
        fragment SelectedScene_scene on Scene {
            name
            ...BattleMap_scene
        }
    `,
    scene,
  );

  return <div ref={ref} {...container} style={{height: '100%'}}>
    <BattleMap width={width} height={height} scene={data} />

  </div>
}
