import { createContext, useContext } from "react";
import { MapEntityScene } from "features/battleMap/mapEntityLayer/MapEntityHelpers";

interface MapEntityContextData {
  isSelected: (id: string) => void;
  selectSet: (ids: string[]) => void;
  selectAdd: (ids: string[]) => void;
  selectToggle: (ids: string[]) => void;
  getSelected: () => MapEntityScene[];
  selectionBounds: [[number, number], [number, number]] | null;
}

export const MapEntityContext = createContext<MapEntityContextData>({} as any);

export function useMapEntityContext() {
  return useContext(MapEntityContext);
}
