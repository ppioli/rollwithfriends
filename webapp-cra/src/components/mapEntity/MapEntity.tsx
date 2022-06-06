import { MapGraphic } from "components/battleMap/MapGraphic";

import { useMapEntityUpdateMutation } from "components/mapEntity/MapEntity.graphql";
import React from "react";

import { useMapEntityContext } from "components/battleMap/mapEntityLayer/MapEntityContext";

export interface MapEntityProps {
  id: string;
  data: MapEntityUpdate;
}

export interface MapEntityUpdate {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MapEntity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function MapEntity({ id, data }: MapEntityProps) {
  const { select, isSelected } = useMapEntityContext();

  const update = useMapEntityUpdateMutation();

  return <MapGraphic {...data} onClick={() => select(id)} />;
}
