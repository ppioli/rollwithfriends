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
import {
  useMapEntityAddMutation,
  useMapEntityNpcAddMutation,
  useMapEntitySubscription,
} from "features/mapEntity/MapEntity.graphql";
import classNames from "classnames";
import { loadImages } from "utils/imageLoader";
import { FileUploadDefinition, uploadBatch } from "utils/HttpHelpers";
import { commitCellSize } from "features/battleMap/mapEntityLayer/GridSize";

export interface SceneProps {
  id: string;
  scene: SelectedScene_scene$key;
  className: string;
}

const graphql = require("babel-plugin-relay/macro");

export function SelectedScene({ id, scene, className }: SceneProps) {
  commitCellSize(60, id);
  console.info(
    " ++++++++ ++++++++ ++++++++ ++++++++ Redrawing scene ++++++++ ++++++++ ++++++++ ++++++++ "
  );
  useMapEntitySubscription({ sceneId: id });
  const selectBoxRef = useRef<HTMLDivElement>(null);
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

  const commit = useMapEntityAddMutation();
  const commitNpc = useMapEntityNpcAddMutation();
  const { handlers, fileDragging, offsetX, offsetY, scale } = useMapControl({
    selectBoxRef,
    onChange: ([dx, dy], scale) => {
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      }
    },
    onFilesDropped: (files) => {
      loadImages(files).then((imageList) => {
        const entities = imageList.map((img, ix) => ({
          x: 10,
          y: 10,
          width: img.width,
          height: img.height,
          name: files[ix].name,
        }));

        const input = { sceneId: id, entities };

        commit({ input }, (data) => {
          const result = data.mapEntityAdd.mapEntity;
          if (!result) {
            return;
          }

          const uploads: FileUploadDefinition[] = result.map((added) => {
            return {
              file: files.find((f) => f.name === added.name)!,
              id: added.content.fileId!,
            };
          });

          uploadBatch(uploads);
        });
      });
    },
    onEntryDropped: (entry) => {
      const entity = {
        x: -offsetX + Math.round(entry.x / scale),
        y: -offsetY + Math.round(entry.y / scale),
        npcId: entry.entryId,
        name: entry.name,
      };
      commitNpc({
        input: {
          sceneId: id,
          entities: [entity],
        },
      });
    },
    onBoxSelect: ({ x, y, width, height }) => {},
  });

  const cellSize = 60;

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
        {...handlers}
        className={classNames(
          "w-full h-full relative touch-none overflow-hidden"
        )}
      >
        {draw && (
          <div className={classNames("absolute")} ref={containerRef}>
            <Grid
              {...layerProps}
              width={width}
              height={height}
              className={"absolute"}
            />

            <MapEntityLayer sceneId={id} {...layerProps} entities={data} />
          </div>
        )}
        <div className={"absolute left-1 top-1"}>
          {`Position (${offsetX},${offsetY})`} <br />
          {`Canvas size (${width},${height})`} <br />
          {`Scale (${scale})`} <br />
        </div>
        {false && fileDragging && (
          <div
            className={
              "absolute inset-y-0 left-0 editor-width flex justify-center content-center flex-wrap"
            }
          >
            <div className={"text-center"}>
              <h3>Drag ICON</h3>
              <h1>Drop to add</h1>
            </div>
          </div>
        )}
        <Toolbar
          sceneId={id}
          className={
            "absolute top-0 bottom-0 left-1 flex flex-col justify-center"
          }
        />
        <div className={"absolute"} ref={selectBoxRef}>
          <div className={"w-full h-full border-2 border-primary absolute"} />
          <div className={"w-full h-full bg-primary opacity-30 absolute"} />
        </div>
      </div>
    </div>
  );
}
