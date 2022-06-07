import { MapEntityLayer_scene$key } from "features/battleMap/mapEntityLayer/__generated__/MapEntityLayer_scene.graphql";
import BaseLayerProps from "features/battleMap/BaseLayerProps";
import { MapEntity } from "features/mapEntity/MapEntity";
import { useFragment } from "react-relay";
import { MapEntityContext } from "features/battleMap/mapEntityLayer/MapEntityContext";
import { EntitySelectBox } from "features/battleMap/mapEntityLayer/EntitySelectBox";
import { SyntheticEvent, useCallback, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { useDrag, useGesture } from "@use-gesture/react";

const graphql = require("babel-plugin-relay/macro");

interface MapEntityLayerProps extends BaseLayerProps {
  entities: MapEntityLayer_scene$key;
  className: string;
}

export default function MapEntityLayer({
  offsetX,
  offsetY,
  entities,
  className,
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
        }
      }
    `,
    entities
  );

  const [selected, setSelected] = useState<Set<string>>(new Set<string>());

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
      if (selected.size === 0) {
        return null;
      }
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

      data.entities
        .filter((e) => selected.has(e.id))
        .forEach((s) => {
          minX = Math.min(s.x, minX);
          minY = Math.min(s.y, minY);
          maxX = Math.max(s.x + s.width, maxX);
          maxY = Math.max(s.y + s.height, maxY);
        });

      return [
        [minX, minY],
        [maxX, maxY],
      ];
    }, [selected, data]);

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

  // onPointerUp: ({ event, shiftKey }) => {
  //   if (!event.isPropagationStopped() && !shiftKey) {
  //     console.log("up parent");
  //
  //   }
  // },
  // onDragStart: (e) => {
  //   console.log(e);
  //   if (!e.ctrlKey) {
  //     e.event.stopPropagation();
  //     setDragging(true);
  //     console.log("drag start parent");
  //   }
  // },
  // onDrag: ({ event, ctrlKey, dragging }) => {
  //   if (!event.bubbles) {
  //     console.log("No Bubbles");
  //   }
  //   if (ctrlKey || !dragging) {
  //     return;
  //   }
  //   event.stopPropagation();
  //   console.log("dragging parent");
  // },
  // onDragEnd: ({ event, ctrlKey }) => {
  //   if (!event.bubbles) {
  //     console.log("No Bubbles");
  //   }
  //   if (dragging) {
  //     event.stopPropagation();
  //     event.preventDefault();
  //     console.log("end parent");
  //   } else {
  //     console.log("Clicked kinda");
  //     selectSet([]);
  //   }
  //   setDragging(false);
  // },
  //   },
  //   {
  //     drag: {
  //       filterTaps: true,
  //     },
  //   }
  // );

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
        className={"absolute w-screen h-screen bg-cyan-700 touch-none"}
        {...bindOuter()}
      >
        <div
          className={classNames(className)}
          style={{ top: offsetY, left: offsetX }}
        >
          {data.entities
            .filter((e) => !isSelected(e.id))
            .map((data) => {
              return <MapEntity key={data.id} {...data} />;
            })}

          <EntitySelectBox>
            {(offsetX, offsetY) =>
              data.entities
                .filter((e) => isSelected(e.id))
                .map((data) => {
                  const { x, y, ...rest } = data;
                  return (
                    <MapEntity
                      key={data.id}
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
