import { MapGraphic } from "features/battleMap/MapGraphic";

import React, { MouseEventHandler } from "react";

import { useMapEntityContext } from "features/battleMap/mapEntityLayer/MapEntityContext";
import { BoxProps } from "components/moveResizeHandler/BoxProps";

export interface MapEntity extends BoxProps {
  id: string;
  href: string;
}

export function MapEntity({ id, ...data }: MapEntity & { scale: number }) {
  const { selectToggle, selectSet } = useMapEntityContext();

  const handleClick = (add: boolean) => {
    if (add) {
      selectToggle([id]);
    } else {
      selectSet([id]);
    }
  };

  return <MapGraphic {...data} onClick={handleClick} />;
}
