import { createContext } from "react";
import { MapEntityScene } from "features/battleMap/mapEntityLayer/MapEntityHelpers";

interface MapEntityContextData {
  isSelected: (id: string) => void;
  selectSet: (ids: string[]) => void;
  selectAdd: (ids: string[]) => void;
  selectToggle: (ids: string[]) => void;
  getSelected: () => MapEntityScene[];
  selectionBounds: [[number, number], [number, number]] | null;
  getEntitySize: (entity: MapEntityScene) => [number, number];
}

export const MapEntityContext = createContext<MapEntityContextData>({} as any);
