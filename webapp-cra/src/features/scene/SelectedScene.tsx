import BattleMap from "components/battleMap/BattleMap";
import {
  SelectedScene_scene$data,
  SelectedScene_scene$key,
} from "features/scene/__generated__/SelectedScene_scene.graphql";
import { HTMLProps } from "react";
import { useFragment } from "react-relay";
import { useResizeDetector } from "react-resize-detector";
import { useMapEntitySubscription } from "components/mapEntity/MapEntity.graphql";

export interface SceneProps {
  id: string;
  scene: SelectedScene_scene$key;
  container?: HTMLProps<HTMLDivElement>;
}

const graphql = require("babel-plugin-relay/macro");

export function SelectedScene({ id, scene, container }: SceneProps) {
  const { ref, width, height } = useResizeDetector();

  useMapEntitySubscription(id);

  const data: SelectedScene_scene$data = useFragment(
    graphql`
      fragment SelectedScene_scene on Scene {
        name
        ...BattleMap_scene
      }
    `,
    scene
  );

  const draw = width && height && width > 50 && height > 50;

  return (
    <div ref={ref} {...container} style={{ height: "100%" }}>
      {draw && <BattleMap width={width} height={height} scene={data} />}
    </div>
  );
}
