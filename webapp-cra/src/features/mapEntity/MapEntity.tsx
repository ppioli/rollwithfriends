import { MapGraphic, MapGraphicProps } from "features/battleMap/MapGraphic";

import React from "react";

import { useMapEntityContext } from "features/battleMap/mapEntityLayer/MapEntityContext";
import { useFragment } from "react-relay";
import { MapEntityFragment } from "features/mapEntity/MapEntity.graphql";
import { MapEntityFragment$key } from "features/mapEntity/__generated__/MapEntityFragment.graphql";

export interface MapEntityData {
  id: string;
  entity: MapEntityFragment$key;
  offsetX?: number;
  offsetY?: number;
}

export function MapEntity({
  id,
  entity,
  scale,
  offsetX,
  offsetY,
}: MapEntityData & { scale: number }) {
  const { selectToggle, selectSet } = useMapEntityContext();
  const data = useFragment(MapEntityFragment, entity);

  const onClick = (add: boolean) => {
    if (add) {
      selectToggle([id]);
    } else {
      selectSet([id]);
    }
  };

  if (data.content.__typename === "ImageContent") {
    const props: MapGraphicProps = {
      id,
      scale,
      onClick,
      x: data.x - (offsetX ?? 0),
      y: data.y - (offsetY ?? 0),
      width: data.width,
      height: data.height,
    };

    return <MapGraphic {...props} />;
  }

  if (data.content.__typename === "Npc5EContent") {
    const props: MapGraphicProps = {
      id,
      scale,
      onClick,
      x: data.x - (offsetX ?? 0),
      y: data.y - (offsetY ?? 0),
      width: 30, //data.width,
      height: 30, //, data.height,
    };

    return <MapGraphic {...props} />;
  }

  return null;
}
