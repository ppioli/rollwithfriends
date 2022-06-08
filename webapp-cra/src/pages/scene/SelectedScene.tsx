import {
  SelectedScene_scene$data,
  SelectedScene_scene$key,
} from "pages/scene/__generated__/SelectedScene_scene.graphql";
import { useRef } from "react";
import { useFragment } from "react-relay";
import { useResizeDetector } from "react-resize-detector";
import Grid from "features/battleMap/grid/Grid";
import MapEntityLayer from "features/battleMap/mapEntityLayer/MapEntityLayer";
import useMapControl from "features/battleMap/useMapControl";
import Toolbar from "features/battleMap/toolbar/Toolbar";
import { Point } from "utils/Point";
import { useMapEntitySubscription } from "features/mapEntity/MapEntity.graphql";

export interface SceneProps {
  id: string;
  scene: SelectedScene_scene$key;
  className: string;
}

const graphql = require("babel-plugin-relay/macro");

export function SelectedScene({ id, scene, className }: SceneProps) {
  console.info(
    " ++++++++ ++++++++ ++++++++ ++++++++ Redrawing scene ++++++++ ++++++++ ++++++++ ++++++++ "
  );
  useMapEntitySubscription({ sceneId: id });

  const data: SelectedScene_scene$data = useFragment(
    graphql`
      fragment SelectedScene_scene on Scene {
        name
        ...MapEntityLayer_scene
      }
    `,
    scene
  );

  const { ref, width, height } = useResizeDetector();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement | null>(null);

  const { bind, offsetX, offsetY, scale } = useMapControl({
    inputContainerRef,
    onChange: ([dx, dy], scale) => {
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      }
    },
  });

  const cellSize = 60;

  console.info(scale);

  const layerProps = {
    offsetX,
    offsetY,
    cellSize,
    scale,
  };

  const draw = width && height && width > 50 && height > 50;

  return (
    <div ref={ref} className={className}>
      <div
        ref={inputContainerRef}
        {...bind()}
        className={"w-full h-full relative touch-none overflow-hidden"}
      >
        {draw && (
          <div className={"absolute"} ref={containerRef}>
            <Grid
              {...layerProps}
              width={width}
              height={height}
              className={"absolute"}
            />

            <MapEntityLayer sceneId={id} {...layerProps} entities={data} />
          </div>
        )}
        <div className={"absolute left-1 bottom-1"}>
          {`Position (${offsetX},${offsetY})`} <br />
          {`Canvas size (${width},${height})`} <br />
          {`Scale (${scale})`} <br />
        </div>

        <Toolbar
          sceneId={id}
          className={
            "absolute top-0 bottom-0 left-1 flex flex-col justify-center"
          }
        />
      </div>
    </div>
  );
}
