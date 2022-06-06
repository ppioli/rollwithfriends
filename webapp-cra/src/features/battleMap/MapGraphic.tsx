import React, { CSSProperties, MouseEventHandler } from "react";

export interface MapGraphic {
  x: number;
  y: number;
  width: number;
  height: number;
  onClick: MouseEventHandler;
}

function Image({ x, y, width, height, onClick }: MapGraphic) {
  const style: CSSProperties = {
    position: "absolute",
    top: y,
    left: x,
    width: width,
    height: height,
  };

  return (
    <div style={style} onClick={onClick}>
      <img
        src={
          "https://i.pinimg.com/originals/6c/12/e7/6c12e78a564a65f2c4d56556a1ff922c.png"
        }
        width={width}
        height={height}
        style={{ width, height }}
        alt={`token`}
      />
    </div>
  );
}

export const MapGraphic = React.memo(Image);

// export const SelectedMapGraphic = withMoveResizeHandler(Image);
