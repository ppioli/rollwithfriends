import { commitLocalUpdate } from "react-relay";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";
import { RecordProxy } from "relay-runtime";
import { BoxProps } from "components/moveResizeHandler/BoxProps";
import { EntityData } from "pages/scene/SelectedSceneContext";
import { inRange } from "lodash";

export interface SelectionInput {
  sceneId: string;
  selection: string[];
}

export interface SelectionBoxInput {
  sceneId: string;
  add: boolean;
  selectionBox: BoxProps;
  getEntitySize: (e: EntityData) => [number, number];
}

export function commitSelectionSet({ sceneId, selection }: SelectionInput) {
  return commitLocalUpdate(RelayEnvironment, (store) => {
    const scene = store.get(sceneId);

    const newSelection: RecordProxy[] = [];

    for (const id of selection) {
      const ent = store.get(id);
      if (!ent) {
        console.warn(`Could not find the entity with id ${id}`);
        continue;
      }
      newSelection.push(ent);
    }

    scene?.setLinkedRecords(newSelection, "selected");
  });
}

export function commitSelectionAdd({ sceneId, selection }: SelectionInput) {
  return commitLocalUpdate(RelayEnvironment, (store) => {
    const scene = store.get(sceneId);

    if (!scene) {
      throw new Error(`Could not find scene #${sceneId}`);
    }

    const existing: RecordProxy[] = scene.getLinkedRecords("selected") ?? [];

    for (const id of selection) {
      const ent = store.get(id);
      if (!ent) {
        console.warn(`Could not find the entity with id ${id}`);
        continue;
      }
      existing.push(ent);
    }

    scene?.setLinkedRecords(existing, "selected");
  });
}

export function commitSelectionBoxSet({
  sceneId,
  selectionBox,
  add,
  getEntitySize,
}: SelectionBoxInput) {
  return commitLocalUpdate(RelayEnvironment, (store) => {
    const scene = store.get(sceneId)!;
    const entities = scene.getLinkedRecords("entities")!;
    const newSelection: RecordProxy[] = [];

    for (const entity of entities) {
      const e = {
        x: entity.getValue("x") as number,
        y: entity.getValue("y") as number,
        width: entity.getValue("width") as number,
        height: entity.getValue("height") as number,
        type: entity.getValue("type") as string,
      };
      const [w, h] = getEntitySize(e);

      if (
        inRange(e.x, selectionBox.x, selectionBox.x + selectionBox.width) &&
        inRange(e.y, selectionBox.y, selectionBox.y + selectionBox.height) &&
        inRange(e.x + w, selectionBox.x, selectionBox.x + selectionBox.width) &&
        inRange(e.y + h, selectionBox.y, selectionBox.y + selectionBox.height)
      ) {
        newSelection.push(entity);
      }
    }

    scene?.setLinkedRecords(newSelection, "selected");
  });
}
