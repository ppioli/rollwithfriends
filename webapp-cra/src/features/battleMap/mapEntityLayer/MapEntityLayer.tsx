import { MapEntityLayer_scene$key } from "features/battleMap/mapEntityLayer/__generated__/MapEntityLayer_scene.graphql";
import BaseLayerProps from "features/battleMap/BaseLayerProps";
import { MapEntity } from "features/mapEntity/MapEntity";
import { useFragment } from "react-relay";
import { useCallback, useEffect, useRef } from "react";
import { useGesture } from "@use-gesture/react";
import { useMapEntityDeleteMutation } from "features/mapEntity/MapEntity.graphql";
import { EntitySelectBox } from "features/battleMap/mapEntityLayer/EntitySelectBox";
import { commitSelectionSet } from "features/battleMap/mapEntityLayer/Selection.graphql";
import { useSelectedScene } from "pages/scene/SelectedSceneContext";

const graphql = require("babel-plugin-relay/macro");

interface MapEntityLayerProps extends BaseLayerProps {
  entities: MapEntityLayer_scene$key;
}

export default function MapEntityLayer({
  scale,
  offsetX,
  offsetY,
  entities,
}: MapEntityLayerProps) {
  const { sceneId } = useSelectedScene();
  const data = useFragment(
    graphql`
      fragment MapEntityLayer_scene on Scene {
        ...EntitySelectBox_scene
        selected {
          id
        }
        entities {
          id
          ...MapEntityFragment
        }
      }
    `,
    entities
  );

  const deleteEntities = useMapEntityDeleteMutation();

  const isSelected = useCallback(
    (id: string) => {
      const ent = (data.selected ?? []).find((s) => s.id === id);
      return ent !== undefined;
    },
    [data]
  );

  const bindOuter = useGesture(
    {
      onClick: (event) => {
        // console.log(event);
        console.log("Clicked");
        commitSelectionSet({ sceneId, selection: [] });
      },
      onDragStart: () => {
        console.log("START");
      },
      onDrag: (e) => {
        if (!e.intentional) {
          return;
        }
        console.log("DRAG int", e.intentional);
      },
      onDragEnd: (event) => {
        if (!event.intentional) {
          return;
        }
        console.log("END ", event.intentional);
      },
    },
    {
      drag: {
        filterTaps: true,
        tapsThreshold: 10,
      },
    }
  );

  const clickThing = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.target !== document.body) {
        return;
      }

      if (event.key === "Delete") {
        const selected = data.selected ?? [];
        if (selected.length === 0) {
          return;
        }

        const deleted = selected.map((s) => s.id);
        commitSelectionSet({ sceneId, selection: [] });
        deleteEntities({
          input: {
            deleted,
            sceneId,
          },
        });
      }
    };

    document.addEventListener("keyup", handler);

    return () => document.removeEventListener("keyup", handler);
  }, [deleteEntities, data, sceneId]);

  // const context = {
  //   selectionBounds,
  //   isSelected,
  //   selectAdd,
  //   selectSet,
  //   selectToggle,
  //   getSelected,
  //   getEntitySize,
  // };

  return (
    <div
      id={"click-box"}
      ref={clickThing}
      className={"absolute w-screen h-screen touch-none"}
      {...bindOuter()}
    >
      <div className={"absolute"} style={{ left: offsetX, top: offsetY }}>
        {data.entities
          .filter((e) => !isSelected(e.id))
          .map((data) => {
            return (
              <MapEntity
                key={data.id}
                scale={scale}
                id={data.id}
                entity={data}
              />
            );
          })}

        <EntitySelectBox sceneId={sceneId} scale={scale} query={data}>
          {(offsetX, offsetY) =>
            data.entities
              .filter((e) => isSelected(e.id))
              .map((data) => (
                <MapEntity
                  key={data.id}
                  scale={scale}
                  id={data.id}
                  entity={data}
                  offsetX={offsetX}
                  offsetY={offsetY}
                />
              ))
          }
        </EntitySelectBox>
      </div>
    </div>
  );
}
