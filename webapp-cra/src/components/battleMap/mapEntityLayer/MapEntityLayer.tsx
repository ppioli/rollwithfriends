import { MapEntityLayer_scene$key } from "components/battleMap/mapEntityLayer/__generated__/MapEntityLayer_scene.graphql";
import BaseLayerProps from "components/battleMap/BaseLayerProps";
import { MapEntity } from "components/mapEntity/MapEntity";
import { useFragment } from "react-relay";
import { useContext, useState, createContext } from "react";
import { MapEntityContextProvider } from "components/battleMap/mapEntityLayer/MapEntityContext";

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
  const [selected, setSelected] = useState<string[]>([]);

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

  return (
    <div
      className={className}
      style={{ top: offsetY, left: offsetX }}
      onClick={() => console.log("Clicked")}
    >
      <MapEntityContextProvider data={data.entities as any}>
        {(data.entities ?? []).map((data) => {
          return <MapEntity key={data.id} id={data.id} data={data} />;
        })}
      </MapEntityContextProvider>
    </div>
  );
}
