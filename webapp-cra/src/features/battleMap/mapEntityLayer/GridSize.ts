import { commitLocalUpdate, useFragment } from "react-relay";
import { GridSize_scene$key } from "features/battleMap/mapEntityLayer/__generated__/GridSize_scene.graphql";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";

const graphql = require("babel-plugin-relay/macro");

export interface EntitySizeParams {
  query: GridSize_scene$key;
}

interface EntityData {
  readonly width: number;
  readonly height: number;
  readonly type: string;
}
export function commitCellSize(cellSize: number, sceneId: string) {
  commitLocalUpdate(RelayEnvironment, (store) => {
    const scene = store.get(sceneId);

    if (!scene) {
      throw new Error(`Could not find scene ${sceneId}`);
    }

    scene.setValue(cellSize, "cellSize");
  });
}

export function getEntitySize(
  data: EntityData,
  cellSize: number
): [number, number] {
  if (data.type === "IMAGE") {
    return [data.width, data.height];
  }

  if (data.type === "NPC5_E") {
    return [data.width * cellSize, data.height * cellSize];
  }

  throw new Error(`Could not determine size for entity of type ${data.type}`);
}

export function useEntitySize({ query }: EntitySizeParams) {
  const { cellSize } = useFragment(
    graphql`
      fragment GridSize_scene on Scene {
        cellSize
      }
    `,
    query
  );

  return (entity: EntityData) => getEntitySize(entity, cellSize);
}
