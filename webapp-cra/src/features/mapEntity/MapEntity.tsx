import { MapGraphic } from "features/battleMap/MapGraphic";

import React from "react";

import { useMapEntityContext } from "features/battleMap/mapEntityLayer/MapEntityContext";
import { BoxProps } from "components/moveResizeHandler/BoxProps";

export interface MapEntityData extends BoxProps {
  id: string;
  imageState: string;
  imageId: number;
}

export function MapEntity({ id, ...data }: MapEntityData & { scale: number }) {
  const { selectToggle, selectSet } = useMapEntityContext();

  const handleClick = (add: boolean) => {
    if (add) {
      selectToggle([id]);
    } else {
      selectSet([id]);
    }
  };

  return <MapGraphic {...data} onClick={handleClick} id={id} />;
}
