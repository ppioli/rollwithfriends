import { createContext, ReactNode, useContext } from "react";

export interface EntityData {
  readonly width: number;
  readonly height: number;
  readonly type: string;
}

export type EntitySizeFunction = (entity: EntityData) => [number, number];

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
  sceneId: string;
  getEntitySize: EntitySizeFunction;
  cellSize: number;
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
