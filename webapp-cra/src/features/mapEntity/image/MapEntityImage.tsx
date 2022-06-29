import { MapGraphic } from "features/battleMap/MapGraphic";

export interface MapEntityImageProps {
  id: string;
  scale: number;
  x: number;
  y: number;
  width: number;
  height: number;
  onClick: (add: boolean) => void;
}

export function MapEntityImage(props: MapEntityImageProps) {
  return <MapGraphic {...props} />;
}
