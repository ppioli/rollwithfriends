import { MapGraphic, MapGraphicProps } from "features/battleMap/MapGraphic";

import React, { useCallback } from "react";

import { useFragment } from "react-relay";
import { MapEntityFragment } from "features/mapEntity/MapEntity.graphql";
import { MapEntityFragment$key } from "features/mapEntity/__generated__/MapEntityFragment.graphql";
import {
  commitSelectionAdd,
  commitSelectionSet,
} from "features/battleMap/mapEntityLayer/Selection.graphql";
import { useSelectedScene } from "pages/scene/SelectedSceneContext";

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
  const { sceneId, getEntitySize } = useSelectedScene();
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

  const [width, height] = getEntitySize(data);

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
