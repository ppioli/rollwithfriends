import { MapEntityType } from "features/battleMap/mapEntityLayer/__generated__/MapEntityLayer_scene.graphql";

export type MapEntityScene = {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly type: MapEntityType;
};

export function getEntitySize(data: MapEntityScene): [number, number] {
  return [data.width, data.height];
}
