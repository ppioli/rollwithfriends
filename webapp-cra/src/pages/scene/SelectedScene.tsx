import {
  SelectedScene_scene$data,
  SelectedScene_scene$key,
} from "pages/scene/__generated__/SelectedScene_scene.graphql";
import { HTMLProps, useRef } from "react";
import { useFragment } from "react-relay";
import { useResizeDetector } from "react-resize-detector";
import { useMapEntitySubscription } from "features/mapEntity/MapEntity.graphql";
import Grid from "features/battleMap/grid/Grid";
import MapEntityLayer from "features/battleMap/mapEntityLayer/MapEntityLayer";
import useMapControl from "features/battleMap/useMapControl";
import Toolbar from "features/battleMap/toolbar/Toolbar";

export interface SceneProps {
  id: string;
  scene: SelectedScene_scene$key;
  className: string;
}

const graphql = require("babel-plugin-relay/macro");

export function SelectedScene({ id, scene, className }: SceneProps) {
  useMapEntitySubscription(id);

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
  const selectBoxRef = useRef<HTMLDivElement>(null);
  const {
    bind,
    x: offsetX,
    y: offsetY,
  } = useMapControl({
    selectBoxRef,
    onDrag: ({ x: dx, y: dy }) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "transform",
          `translate(${dx}px, ${dy}px)`
        );
      }
    },
  });

  const cellSize = 60;

  const layerProps = {
    offsetX,
    offsetY,
    cellSize,
  };

  const draw = width && height && width > 50 && height > 50;

  return (
    <div ref={ref} className={className}>
      <div
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

            <MapEntityLayer
              {...layerProps}
              className={"absolute"}
              entities={data}
            />
          </div>
        )}
        <div className={"absolute left-1 bottom-1"}>
          {`Position (${offsetX},${offsetY})`} <br />
          {`Canvas size (${width},${height})`} <br />
          {`Scale (${1})`} <br />
        </div>
        <div className={"absolute"} ref={selectBoxRef}>
          <div className={"w-full h-full border-2 border-primary absolute"} />
          <div className={"w-full h-full bg-primary opacity-30 absolute"} />
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
