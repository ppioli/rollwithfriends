import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { MapEntity, MapEntityUpdate } from "components/mapEntity/MapEntity";

interface MapEntityContextData {
  isSelected: (id: string) => void;
  select: (id: string) => void;
}

const MapEntityContext = createContext<MapEntityContextData>({} as any);

interface MapEntityContextProviderProps {
  children: ReactNode;
  data: Readonly<MapEntity>[];
}

export function MapEntityContextProvider({
  children,
  data,
}: MapEntityContextProviderProps) {
  const [selected, setSelected] = useState<Record<string, any>>([]);

  const isSelected = useCallback(
    (id: string) => {
      return selected[id] !== undefined;
    },
    [selected]
  );

  const select = useCallback(
    (id: string) => {
      setSelected((current) => {
        const existing = { ...current };
        existing[id] = data.find((s) => s.id === id);
        return existing;
      });
    },
    [data]
  );

  const bounds = useMemo(() => {
    const min = [Infinity, Infinity];
    const max = [-Infinity, -Infinity];

    data
      .filter((e) => selected[e.id] !== undefined)
      .forEach((s) => {
        console.log("Analyzing", s);
      });

    return [min, max];
  }, [selected, data]);

  const context = {
    isSelected,
    select,
  };

  return (
    <MapEntityContext.Provider value={context}>
      {children}
    </MapEntityContext.Provider>
  );
}

export function useMapEntityContext() {
  return useContext(MapEntityContext);
}
