import { MapEntityLayer_scene$key } from "components/battleMap/mapEntityLayer/__generated__/MapEntityLayer_scene.graphql";
import { layerContainer } from "components/battleMap/mapStyles";
import BaseLayerProps from "components/battleMap/BaseLayerProps";
import { MapEntity } from "components/mapEntity/MapEntity";
import { useMapEntitySubscription } from "components/mapEntity/MapEntity.graphql";
import { useFragment, graphql } from "react-relay";

interface MapEntityLayerProps extends BaseLayerProps {
  entities: MapEntityLayer_scene$key;
}
export const EntityLayerConnection = "MapEntityLayer_scene_entities";

export default function MapEntityLayer({
  offsetX,
  offsetY,
  entities,
}: MapEntityLayerProps) {
  const data = useFragment(
    graphql`
      fragment MapEntityLayer_scene on Scene {
        entities {
          id
          ...MapEntity_Token
        }
      }
    `,
    entities
  );

  useMapEntitySubscription();

  return (
    <div style={{ ...layerContainer, top: offsetY, left: offsetX }}>
      {(data.entities ?? []).map((data) => {
        return (
          <MapEntity
            key={data.id}
            id={data.id}
            entityData={data}
            selected={true}
          />
        );
      })}
    </div>
  );
}
