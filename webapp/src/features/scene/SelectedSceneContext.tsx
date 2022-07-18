import { createContext, ReactNode, useContext } from "react";
import { MapEntityFragment$data } from "__generated__/MapEntityFragment.graphql";

export type EntitySizeFunction = (
  entity: MapEntityFragment$data
) => [number, number];

export interface SelectedSceneContextData {
  sceneId: string;
  cellSize: number;
  getEntitySize: EntitySizeFunction;
}

const SelectedSceneContext = createContext<SelectedSceneContextData>(
  {} as SelectedSceneContextData
);

export interface SelectedSceneContextProviderProps {
  children: ReactNode;
  getEntitySize: EntitySizeFunction;
  cellSize: number;
  sceneId: string;
}

export function SelectedSceneContextProvider(
  props: SelectedSceneContextProviderProps & { children: ReactNode }
) {
  const { children, ...value } = props;

  return (
    <SelectedSceneContext.Provider value={value}>
      {children}
    </SelectedSceneContext.Provider>
  );
}

export function useSelectedScene() {
  return useContext(SelectedSceneContext);
}
