import { MapEntityLayer_scene$key } from "features/battleMap/mapEntityLayer/__generated__/MapEntityLayer_scene.graphql";
import BaseLayerProps from "features/battleMap/BaseLayerProps";
import { MapEntity } from "features/mapEntity/MapEntity";
import { useFragment } from "react-relay";
import { MapEntityContext } from "features/battleMap/mapEntityLayer/MapEntityContext";
import { EntitySelectBox } from "features/battleMap/mapEntityLayer/EntitySelectBox";
import { useCallback, useMemo, useState } from "react";

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

  console.log("Selection size ", selected.size);

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

  console.log("Bounds ", selectionBounds);

  const isSelected = useCallback((id: string) => selected.has(id), [selected]);

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
      <div className={className} style={{ top: offsetY, left: offsetX }}>
        {data.entities
          .filter((e) => !isSelected(e.id))
          .map((data) => {
            return <MapEntity key={data.id} {...data} />;
          })}
      </div>
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
    </MapEntityContext.Provider>
  );
}
