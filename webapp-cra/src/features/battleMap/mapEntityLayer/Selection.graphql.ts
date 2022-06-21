import { commitLocalUpdate } from "react-relay";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";
import { RecordProxy } from "relay-runtime";

export interface SelectionInput {
  sceneId: string;
  selection: string[];
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
