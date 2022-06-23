import {
  SelectedScene_scene$data,
  SelectedScene_scene$key,
} from "pages/scene/__generated__/SelectedScene_scene.graphql";
import { useCallback, useRef } from "react";
import { useFragment } from "react-relay";
import { useResizeDetector } from "react-resize-detector";
import Grid from "features/battleMap/grid/Grid";
import MapEntityLayer from "features/battleMap/mapEntityLayer/MapEntityLayer";
import useMapControl from "features/battleMap/useMapControl";
import {
  useMapEntityAddMutation,
  useMapEntityNpcAddMutation,
  useMapEntitySubscription,
} from "features/mapEntity/MapEntity.graphql";
import classNames from "classnames";
import { loadImages } from "utils/imageLoader";
import { FileUploadDefinition, uploadBatch } from "utils/HttpHelpers";
import {
  EntityData,
  SelectedSceneContextProvider,
} from "pages/scene/SelectedSceneContext";
import { commitSelectionBoxSet } from "features/battleMap/mapEntityLayer/Selection.graphql";
import { Toolbar } from "features/toolbar/Toolbar";
import { MapEntityNpcAddInput } from "features/mapEntity/__generated__/MapEntityNpcAddMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

export interface SceneProps {
  id: string;
  scene: SelectedScene_scene$key;
  className: string;
}

export function SelectedScene({ id, scene, className }: SceneProps) {
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
        ...Toolbar_scene
      }
    `,
    scene
  );

  const { ref, width, height } = useResizeDetector();
  const containerRef = useRef<HTMLDivElement>(null);
  const commit = useMapEntityAddMutation();
  const commitNpc = useMapEntityNpcAddMutation();

  const cellSize = 60;
  const getEntitySize: (entity: EntityData) => [number, number] = useCallback(
    (data: EntityData) => {
      if (data.type === "IMAGE") {
        return [data.width, data.height];
      }

      if (data.type === "NPC5_E") {
        return [data.width * cellSize, data.height * cellSize];
      }

      throw new Error(
        `Could not determine size for entity of type ${data.type}`
      );
    },
    [cellSize]
  );
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
      debugger;
      if (entry.type === "NonPlayerCharacter5E") {
        const x = Math.round((-offsetX + entry.x) / scale);
        const y = Math.round((-offsetY + entry.y) / scale);
        const content = entry.content;
        const entity: MapEntityNpcAddInput = {
          x: Math.round(x / cellSize) * cellSize,
          y: Math.round(y / cellSize) * cellSize,
          npcId: content.id,
          name: content.name,
          size: content.sizes[0],
          maxHp: content.hitPointsAverage,
          ac: content.armorClasses[0].armorClass,
        };
        commitNpc({
          input: {
            sceneId: id,
            entities: [entity],
          },
        });
      }
    },
    onBoxSelect: (selectionBox) => {
      selectionBox.x = (-offsetX + selectionBox.x) / scale;
      selectionBox.y = (-offsetY + selectionBox.y) / scale;
      selectionBox.width = selectionBox.width / scale;
      selectionBox.height = selectionBox.height / scale;

      commitSelectionBoxSet({
        sceneId: id,
        add: false,
        selectionBox,
        getEntitySize,
      });
    },
  });

  const layerProps = {
    offsetX,
    offsetY,
    scale,
  };

  const draw = width && height && width > 50 && height > 50;

  return (
    <SelectedSceneContextProvider
      sceneId={id}
      cellSize={cellSize}
      getEntitySize={getEntitySize}
    >
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

              <MapEntityLayer {...layerProps} entities={data} />
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
            className={"absolute bottom-0 left-0 editor-width"}
            query={data}
          />
          <div className={"absolute"} ref={selectBoxRef}>
            <div className={"w-full h-full border-2 border-primary absolute"} />
            <div className={"w-full h-full bg-primary opacity-30 absolute"} />
          </div>
        </div>
      </div>
    </SelectedSceneContextProvider>
  );
}
