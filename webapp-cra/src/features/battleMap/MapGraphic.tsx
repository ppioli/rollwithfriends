import React, { CSSProperties, MouseEventHandler } from "react";
import { useGesture } from "@use-gesture/react";

export interface MapGraphic {
  scale: number;
  x: number;
  y: number;
  width: number;
  height: number;
  onClick: (add: boolean) => void;
}

function Image({ x, y, width, height, scale, onClick }: MapGraphic) {
  const style: CSSProperties = {
    touchAction: "none",
    position: "absolute",
    top: y * scale,
    left: x * scale,
    width: width * scale,
    height: height * scale,
  };

  const bind = useGesture({
    onClick: ({ event, down, shiftKey }) => {
      console.log("Evt ", event.shiftKey);
      onClick(event.shiftKey);
      event.nativeEvent.stopImmediatePropagation();
      event.stopPropagation();
    },
  });

  return (
    <div style={style} {...bind()}>
      <img
        draggable={false}
        className={"touch-none"}
        src={
          "https://i.pinimg.com/originals/6c/12/e7/6c12e78a564a65f2c4d56556a1ff922c.png"
        }
        width={width * scale}
        height={height * scale}
        style={{ width: width * scale, height: height * scale }}
        alt={`token`}
      />
    </div>
  );
}

export const MapGraphic = React.memo(Image);

// export const SelectedMapGraphic = withMoveResizeHandler(Image);
