import { MapEntityLayer_scene$key } from "features/battleMap/mapEntityLayer/__generated__/MapEntityLayer_scene.graphql";
import BaseLayerProps from "features/battleMap/BaseLayerProps";
import { MapEntity } from "features/mapEntity/MapEntity";
import { useFragment } from "react-relay";
import { MapEntityContext } from "features/battleMap/mapEntityLayer/MapEntityContext";
import { EntitySelectBox } from "features/battleMap/mapEntityLayer/EntitySelectBox";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import { useMapEntityDeleteMutation } from "features/mapEntity/MapEntity.graphql";

const graphql = require("babel-plugin-relay/macro");

interface MapEntityLayerProps extends BaseLayerProps {
  entities: MapEntityLayer_scene$key;
  sceneId: string;
}

export default function MapEntityLayer({
  scale,
  offsetX,
  offsetY,
  entities,
  sceneId,
}: MapEntityLayerProps) {
  const data = useFragment(
    graphql`
      fragment MapEntityLayer_scene on Scene {
        entities {
          id
          x
          y
          width
          height
          imageState
          imageId
        }
      }
    `,
    entities
  );

  const [selected, setSelected] = useState<Set<string>>(new Set<string>());
  const deleteEntities = useMapEntityDeleteMutation();
  const selectAdd = useCallback(
    (ids: string[]) => {
      const existing = new Set(selected);

      ids.forEach((id) => {
        existing.add(id);
      });

      setSelected(existing);
    },
    [selected]
  );

  const selectToggle = useCallback(
    (ids: string[]) => {
      const existing = new Set(selected);

      ids.forEach((id) => {
        if (existing.has(id)) {
          existing.delete(id);
        } else {
          existing.add(id);
        }
      });

      setSelected(existing);
    },
    [selected]
  );

  const getSelected = () => {
    return data.entities.filter((e) => selected.has(e.id));
  };

  const selectSet = useCallback((ids: string[]) => {
    setSelected(new Set(ids));
  }, []);

  const selectionBounds: [[number, number], [number, number]] | null =
    useMemo(() => {
      const selectedEntities = getSelected();
      if (selectedEntities.length === 0) {
        return null;
      }
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

      selectedEntities.forEach((s) => {
        minX = Math.min(s.x, minX);
        minY = Math.min(s.y, minY);
        maxX = Math.max(s.x + s.width, maxX);
        maxY = Math.max(s.y + s.height, maxY);
      });

      return [
        [minX, minY],
        [maxX, maxY],
      ];
    }, [getSelected]);

  const isSelected = useCallback((id: string) => selected.has(id), [selected]);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const bindOuter = useGesture(
    {
      onClick: (event) => {
        // console.log(event);
        console.log("Clicked");
        selectSet([]);
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
        const selected = getSelected();
        if (selected.length === 0) {
          return;
        }

        const deleted = selected.map((s) => s.id);

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
  }, [getSelected]);

  const context = {
    selectionBounds,
    isSelected,
    selectAdd,
    selectSet,
    selectToggle,
    getSelected,
  };

  return (
    <MapEntityContext.Provider value={context}>
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
              return <MapEntity key={data.id} scale={scale} {...data} />;
            })}

          <EntitySelectBox sceneId={sceneId} scale={scale}>
            {(offsetX, offsetY) =>
              data.entities
                .filter((e) => isSelected(e.id))
                .map((data) => {
                  const { x, y, ...rest } = data;
                  return (
                    <MapEntity
                      key={data.id}
                      scale={scale}
                      x={x - offsetX}
                      y={y - offsetY}
                      {...rest}
                    />
                  );
                })
            }
          </EntitySelectBox>
          <div className={"absolute"} ref={selectBoxRef}>
            <div className={"w-full h-full border-2 border-primary absolute"} />
            <div className={"w-full h-full bg-primary opacity-30 absolute"} />
          </div>
        </div>
      </div>
    </MapEntityContext.Provider>
  );
}