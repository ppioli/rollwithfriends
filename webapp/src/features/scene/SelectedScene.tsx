import { useCallback, useRef } from "react";
import { useResizeDetector } from "react-resize-detector";
import Grid from "features/battleMap/grid/Grid";
import MapEntityLayer from "features/battleMap/mapEntityLayer/MapEntityLayer";
import useMapControl from "features/battleMap/useMapControl";
import classNames from "classnames";
import { commitSelectionBoxSet } from "features/battleMap/mapEntityLayer/Selection.graphql";
import { useFragment } from "react-relay";
import { SelectedSceneContextProvider } from "features/scene/SelectedSceneContext";
import { SelectedScene_scene$key } from "__generated__/SelectedScene_scene.graphql";
import { graphql } from "relay-runtime";
import { mutationFromUpload } from "features/mapEntity/image/MapEntityImage.graphql";
import { uploadBatch } from "lib/uploadImage";
import { MapEntityFragment$data } from "__generated__/MapEntityFragment.graphql";

export interface SceneProps {
  query: SelectedScene_scene$key;
  className: string;
}

export function SelectedScene({ query, className }: SceneProps) {
  console.info(
    " ++++++++ ++++++++ ++++++++ ++++++++ Redrawing scene ++++++++ ++++++++ ++++++++ ++++++++ "
  );

  const scene = useFragment(
    graphql`
      fragment SelectedScene_scene on Scene {
        id
        name
        ...MapEntityLayer_scene
      }
    `,
    query
  );

  // useMapEntitySubscription({ data });
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const { ref, width, height } = useResizeDetector();
  const containerRef = useRef<HTMLDivElement>(null);

  const cellSize = 60;
  const getEntitySize: (entity: MapEntityFragment$data) => [number, number] =
    useCallback(
      (data: MapEntityFragment$data) => {
        switch (data.content.__typename) {
          case "ImageContent":
            return [data.width, data.height];
          case "Npc5EContent":
            return [data.width * cellSize, data.height * cellSize];
          case "%other":
          default:
            throw new Error(
              `Could not determine size for entity of type ${data.content.__typename}`
            );
        }
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
    onFilesDropped: (files) =>
      uploadBatch(files, (uploads) => mutationFromUpload(scene.id, uploads)),
    onEntryDropped: (entry) => {
      // TODO upgrade this
      // debugger;
      // if (entry.type === "NonPlayerCharacter5E") {
      //   const x = Math.round((-offsetX + entry.x) / scale);
      //   const y = Math.round((-offsetY + entry.y) / scale);
      //   const content = entry.content;
      //   const entity: MapEntityNpc5EAddInput = {
      //     x: Math.round(x / cellSize) * cellSize,
      //     y: Math.round(y / cellSize) * cellSize,
      //     npcId: content.id,
      //     name: content.name,
      //     size: content.sizes[0],
      //     maxHp: content.hitPointsAverage,
      //     ac: content.armorClasses[0].armorClass,
      //   };
      //   mapEntityNpc5eAddMutation({
      //     input: {
      //       sceneId,
      //       entities: [entity],
      //     },
      //   });
      // }
    },
    onBoxSelect: (selectionBox) => {
      selectionBox.x = (-offsetX + selectionBox.x) / scale;
      selectionBox.y = (-offsetY + selectionBox.y) / scale;
      selectionBox.width = selectionBox.width / scale;
      selectionBox.height = selectionBox.height / scale;

      commitSelectionBoxSet({
        sceneId: scene.id,
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

  if (scene == null) {
    return null;
  }
  return (
    <SelectedSceneContextProvider
      sceneId={scene.id}
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

              <MapEntityLayer {...layerProps} entities={scene} />
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

          <div className={"absolute"} ref={selectBoxRef}>
            <div className={"w-full h-full border-2 border-primary absolute"} />
            <div className={"w-full h-full bg-primary opacity-30 absolute"} />
          </div>
        </div>
      </div>
    </SelectedSceneContextProvider>
  );
}
