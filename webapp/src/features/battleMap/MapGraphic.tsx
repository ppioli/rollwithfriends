import React, { CSSProperties, ReactNode } from "react";
import { useGesture } from "@use-gesture/react";
import { ServerUrl } from "lib/appFetch";

export interface MapGraphicProps {
  id: string;
  scale: number;
  x: number;
  y: number;
  width: number;
  height: number;
  onClick: (add: boolean) => void;
}

function Image({ id, x, y, width, height, scale, onClick }: MapGraphicProps) {
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

  let Content: ReactNode;

  // if (imageState === "LOADED") {
  Content = (
    <img
      draggable={false}
      className={"touch-none"}
      src={`${ServerUrl}/image/token/${id}`}
      width={width * scale}
      height={height * scale}
      style={{ width: width * scale, height: height * scale }}
      alt={`token`}
    />
  );
  // }

  // if (imageState === "LOADING") {
  //   Content = (
  //     <ImageLoader
  //       width={width}
  //       height={height}
  //       imageId={imageId}
  //       entityId={id}
  //     />
  //   );
  // }
  //
  // if (imageState === "MISSING") {
  //   Content = (
  //     <ImageMissing
  //       width={width}
  //       height={height}
  //       imageId={imageId}
  //       entityId={id}
  //     />
  //   );
  // }

  return (
    <div style={style} {...bind()}>
      {Content}
    </div>
  );
}

export const MapGraphic = React.memo(Image);

// export const SelectedMapGraphic = withMoveResizeHandler(Image);
