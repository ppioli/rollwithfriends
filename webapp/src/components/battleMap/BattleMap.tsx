import { BattleMap_scene$key } from "components/battleMap/__generated__/BattleMap_scene.graphql";
import Grid from "components/battleMap/grid/Grid";
import useMapControl from "components/battleMap/useMapControl";
import { useRef } from "react";
import MapEntityLayer from "components/battleMap/mapEntityLayer/MapEntityLayer";
import { layer, layerContainer } from "components/battleMap/mapStyles";
import Toolbar from "components/battleMap/toolbar/Toolbar";
import { useFragment, graphql } from "react-relay";

interface BattleMapProps {
  width: number;
  height: number;
  scene: BattleMap_scene$key;
}

export default function BattleMap({ width, height, scene }: BattleMapProps) {
  const containerRef = useRef<HTMLDivElement>();

  const data = useFragment(
    graphql`
      fragment BattleMap_scene on Scene {
        id
        ...MapEntityLayer_scene
      }
    `,
    scene
  );
  const {
    bind,
    x: offsetX,
    y: offsetY,
  } = useMapControl({
    onDrag: ({ x: dx, y: dy }) => {
      if (containerRef) {
        containerRef.current.style.setProperty(
          "transform",
          `translate(${dx}px, ${dy}px)`
        );
      }
    },
  });

  const cellSize = 60;

  const layerProps = {
    height,
    width,
    offsetX,
    offsetY,
    cellSize,
  };

  return (
    <div {...bind()} style={{ ...layerContainer }}>
      <div
        style={{ ...layer, top: 10, left: 10, right: 100 }}
        className={"text-right"}
      >
        {`Position (${offsetX},${offsetY})`} <br />
        {`Canvas size (${width},${height})`} <br />
        {`Scale (${1})`} <br />
      </div>
      <div ref={containerRef} style={layer}>
        <div style={layerContainer}>
          <Grid {...layerProps} />
          <MapEntityLayer {...layerProps} entities={data} />
        </div>
      </div>
      <Toolbar sceneId={data.id} />
    </div>
  );
}
