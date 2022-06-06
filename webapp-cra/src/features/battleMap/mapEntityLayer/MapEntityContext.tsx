import { createContext, useContext } from "react";
import { MapEntity } from "features/mapEntity/MapEntity";

interface MapEntityContextData {
  isSelected: (id: string) => void;
  selectSet: (ids: string[]) => void;
  selectAdd: (ids: string[]) => void;
  selectToggle: (ids: string[]) => void;
  getSelected: () => MapEntity[];
  selectionBounds: [[number, number], [number, number]] | null;
}

export const MapEntityContext = createContext<MapEntityContextData>({} as any);

export function useMapEntityContext() {
  return useContext(MapEntityContext);
}
