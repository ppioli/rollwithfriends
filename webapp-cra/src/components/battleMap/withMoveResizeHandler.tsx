import { MapEntityUpdate } from "components/mapEntity/MapEntity";
import React, { CSSProperties, useCallback } from "react";
import { usePosition } from "utils/hooks";
import { CornerData, CornersValues } from "utils/Corners";
import { useDrag } from "@use-gesture/react";
import { Point } from "utils/Point";

const resizeHandlerSize = 10;

interface MoveResizeHandlerProps {
  onUpdate: (props: MapEntityUpdate) => void;
}

const withMoveResizeHandler = (
  component: {
    (props: MapEntityUpdate): Exclude<React.ReactNode, undefined>;
    displayName?: string;
  },
  componentName = component.displayName ?? component.name
): {
  (props: MapEntityUpdate & MoveResizeHandlerProps): JSX.Element;
  displayName: string;
} => {
  function WithSampleHoc({
    onUpdate: updateToken,
    ...tokenProps
  }: MapEntityUpdate & MoveResizeHandlerProps) {
    const { x, y, width, height } = tokenProps;
    //Do something special to justify the HoC.
    const [dx, dy, setDeltaPosition] = usePosition({ x: 0, y: 0 });
    const [dw, dh, setDeltaSize] = usePosition({ x: 0, y: 0 });

    const updatePos = useCallback(
      (pos: Point) => setDeltaPosition(pos),
      [setDeltaPosition]
    );
    const updateSize = useCallback(
      (deltaSize: Point, deltaPos: Point) => {
        setDeltaSize(deltaSize);
        setDeltaPosition(deltaPos);
      },
      [setDeltaPosition, setDeltaSize]
    );

    const onUpdate = (token: MapEntityUpdate) => {
      setDeltaPosition({ x: 0, y: 0 });
      setDeltaSize({ x: 0, y: 0 });
      updateToken(token);
    };

    const computedProps: MapEntityUpdate = {
      x: x + dx,
      y: y + dy,
      width: width + dw,
      height: height + dh,
    };

    return (
      <>
        {component(computedProps)}
        <ResizeMoveBox
          {...computedProps}
          onMove={updatePos}
          onResize={updateSize}
          onUpdate={onUpdate}
        />
      </>
    ) as JSX.Element;
  }

  WithSampleHoc.displayName = `withMoveResizeHandler(${componentName})`;

  let wrappedComponent = React.memo(WithSampleHoc);

  //copyStaticProperties(component, wrappedComponent);

  return wrappedComponent as typeof WithSampleHoc;
};

interface ResizeMoveBoxProps extends MapEntityUpdate {
  onMove: (delta: Point) => void;
  onResize: (deltaSize: Point, deltaPosition: Point) => void;
  onUpdate: (props: MapEntityUpdate) => void;
}

function ResizeMoveBox({
  x,
  y,
  width,
  height,
  onMove,
  onResize,
  onUpdate,
}: ResizeMoveBoxProps) {
  const bind = useDrag(({ down, movement: [mx, my], event }) => {
    event.stopPropagation();

    onMove({ x: mx, y: my });
    if (!down) {
      onUpdate({
        x,
        y,
        width,
        height,
      });
    }
  });

  return (
    <>
      <div
        {...bind()}
        className={"border-primary border-2 absolute touch-none"}
        style={{
          top: y,
          left: x,
          width: width,
          height: height,
        }}
      />
      {CornersValues.map((corner, ix) => (
        <CornerDrag
          key={`corner-${corner.vector[0]}-${corner.vector[1]}`}
          onResize={onResize}
          onUpdate={onUpdate}
          corner={corner}
          x={x}
          y={y}
          width={width}
          height={height}
        />
      ))}
    </>
  );
}

interface CornerDragProps extends MapEntityUpdate {
  corner: CornerData;
  onResize: (deltaSize: Point, deltaPosition: Point) => void;
  onUpdate: (props: MapEntityUpdate) => void;
}

export const CornerDrag = ({
  corner,
  onResize,
  onUpdate,
  ...tokenProps
}: CornerDragProps) => {
  // const [dx, dy, setDeltaPos]= usePosition()
  const deltaHandler = getCornerDeltaHandler(corner);
  const {
    vector: [cx, cy],
  } = corner;
  const bind = useDrag(({ down, movement, ctrlKey, event }) => {
    event.stopPropagation();
    const { deltaSize, deltaPosition } = deltaHandler(movement, ctrlKey);
    onResize(deltaSize, deltaPosition);
    if (!down) {
      onUpdate({
        x,
        y,
        width,
        height,
      });
    }
  });
  const { x, y, width, height } = tokenProps;
  return (
    <div
      className={"bg-primary absolute touch-none"}
      {...bind()}
      style={{
        top: y + height / 2 + (cy * height) / 2 - resizeHandlerSize / 2,
        left: x + width / 2 + (cx * width) / 2 - resizeHandlerSize / 2,
        width: resizeHandlerSize,
        height: resizeHandlerSize,
      }}
    />
  );
};

export default withMoveResizeHandler;

const getCornerDeltaHandler = ({ vector: [vx, vy] }: CornerData) => {
  return ([cx, cy]: [number, number], keepAspectRatio: boolean = false) => {
    const dw = cx * vx;
    const dh = cy * vy;

    return {
      deltaSize: {
        x: dw,
        y: dh,
      },
      deltaPosition: {
        x: vx == -1 ? dw * -1 : 0,
        y: vy == -1 ? dh * -1 : 0,
      },
    };
  };
};
