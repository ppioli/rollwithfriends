import { MapGraphic, MapGraphicProps } from "features/battleMap/MapGraphic";

import React, { useCallback } from "react";

import { useFragment } from "react-relay";
import { MapEntityFragment } from "features/mapEntity/MapEntity.graphql";
import { MapEntityFragment$key } from "features/mapEntity/__generated__/MapEntityFragment.graphql";
import {
  commitSelectionAdd,
  commitSelectionSet,
} from "features/battleMap/mapEntityLayer/Selection.graphql";
import { getEntitySize } from "features/battleMap/mapEntityLayer/GridSize";

export interface MapEntityData {
  id: string;
  sceneId: string;
  entity: MapEntityFragment$key;
  gridSize: number;
  offsetX?: number;
  offsetY?: number;
}

export function MapEntity({
  id,
  entity,
  scale,
  gridSize,
  offsetX,
  offsetY,
  sceneId,
}: MapEntityData & { scale: number }) {
  const data = useFragment(MapEntityFragment, entity);

  const onClick = useCallback(
    (add: boolean) => {
      if (add) {
        commitSelectionAdd({ sceneId, selection: [id] });
      } else {
        commitSelectionSet({ sceneId, selection: [id] });
      }
    },
    [id, sceneId]
  );

  const [width, height] = getEntitySize(data, gridSize);

  if (data.content.__typename === "ImageContent") {
    const props: MapGraphicProps = {
      id,
      scale,
      onClick,
      x: data.x - (offsetX ?? 0),
      y: data.y - (offsetY ?? 0),
      width,
      height,
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
      width, //data.width,
      height, //, data.height,
    };

    return <MapGraphic {...props} />;
  }

  return null;
}
