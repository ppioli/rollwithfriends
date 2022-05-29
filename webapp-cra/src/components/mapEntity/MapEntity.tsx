import {
  MapGraphic,
  SelectedMapGraphic,
} from "components/battleMap/MapGraphic";
import {
  MapEntity_Token$data,
  MapEntity_Token$key,
} from "components/mapEntity/__generated__/MapEntity_Token.graphql";
import { useMapEntityUpdateMutation } from "components/mapEntity/MapEntity.graphql";
import React from "react";
import { useFragment } from "react-relay";

const graphql = require("babel-plugin-relay/macro");

export interface MapEntityProps {
  id: string;
  entityData: MapEntity_Token$key;
  selected: boolean;
}

export interface MapEntityUpdate {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function MapEntity({ id, entityData, selected }: MapEntityProps) {
  const data: MapEntity_Token$data = useFragment(
    graphql`
      fragment MapEntity_Token on MapEntity {
        x
        y
        width
        height
      }
    `,
    entityData
  );

  const update = useMapEntityUpdateMutation(id);

  if (selected) {
    return <SelectedMapGraphic {...data} onUpdate={update} />;
  }

  return <MapGraphic {...data} />;
}
