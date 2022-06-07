import React, { CSSProperties, ReactNode, useCallback, useState } from "react";
import { CornerData, CornersValues } from "utils/Corners";
import { useDrag, useGesture } from "@use-gesture/react";
import { Point } from "utils/Point";
import { BoxProps } from "components/moveResizeHandler/BoxProps";

const resizeHandlerSize = 10;

// interface MoveResizeHandlerProps {
//   onUpdate: (props: MapEntityUpdate) => void;
// }
//
// const withMoveResizeHandler = (
//   component: {
//     (props: MapEntityUpdate): Exclude<React.ReactNode, undefined>;
//     displayName?: string;
//   },
//   componentName = component.displayName ?? component.name
// ): {
//   (props: MapEntityUpdate & MoveResizeHandlerProps): JSX.Element;
//   displayName: string;
// } => {
//   function WithSampleHoc({
//     onUpdate: updateToken,
//     ...tokenProps
//   }: MapEntityUpdate & MoveResizeHandlerProps) {
//     const { x, y, width, height } = tokenProps;
//     //Do something special to justify the HoC.
//     const [dx, dy, setDeltaPosition] = usePosition({ x: 0, y: 0 });
//     const [dw, dh, setDeltaSize] = usePosition({ x: 0, y: 0 });
//
//     const updatePos = useCallback(
//       (pos: Point) => setDeltaPosition(pos),
//       [setDeltaPosition]
//     );
//     const updateSize = useCallback(
//       (deltaSize: Point, deltaPos: Point) => {
//         setDeltaSize(deltaSize);
//         setDeltaPosition(deltaPos);
//       },
//       [setDeltaPosition, setDeltaSize]
//     );
//
//     const onUpdate = (token: MapEntityUpdate) => {
//       setDeltaPosition({ x: 0, y: 0 });
//       setDeltaSize({ x: 0, y: 0 });
//       updateToken(token);
//     };
//
//     const computedProps: MapEntityUpdate = {
//       x: x + dx,
//       y: y + dy,
//       width: width + dw,
//       height: height + dh,
//     };
//
//     return (
//       <>
//         {component(computedProps)}
//         <ResizeMoveBox
//           {...computedProps}
//           onMove={updatePos}
//           onResize={updateSize}
//           onUpdate={onUpdate}
//         />
//       </>
//     ) as JSX.Element;
//   }
//
//   WithSampleHoc.displayName = `withMoveResizeHandler(${componentName})`;
//
//   let wrappedComponent = React.memo(WithSampleHoc);
//
//   //copyStaticProperties(component, wrappedComponent);
//
//   return wrappedComponent as typeof WithSampleHoc;
// };

export interface ResizeMoveBoxEvent {
  dx: number;
  dy: number;
  rw: number;
  rh: number;
}

export interface DeltaChange {
  dx: number;
  dy: number;
  dw: number;
  dh: number;
}

interface ResizeMoveBoxProps extends BoxProps {
  onChange?: (event: ResizeMoveBoxEvent) => void;
  onSubmit?: (event: ResizeMoveBoxEvent) => void;
}

export function ResizeMoveBox({
  x,
  y,
  width,
  height,
  onChange,
  onSubmit,
}: ResizeMoveBoxProps) {
  const [deltaPos, setDeltaPos] = useState([0, 0]);
  const [deltaSize, setDeltaSize] = useState([0, 0]);

  const [dx, dy] = deltaPos;
  const [dw, dh] = deltaSize;

  const isChanged =
    Math.abs(dx) > 5 ||
    Math.abs(dy) > 5 ||
    Math.abs(dw) > 5 ||
    Math.abs(dh) > 5;

  const notifyChange = () => {
    if (onChange && isChanged) {
      onChange(buildEvent());
    }
  };

  const buildEvent = () => {
    return {
      dx,
      dy,
      rw: (width + dw) / width,
      rh: (height + dh) / height,
    };
  };

  const notifySubmit = () => {
    console.log("Notify submit ", isChanged);
    if (onSubmit && isChanged) {
      onSubmit(buildEvent());
    }
    setDeltaPos([0, 0]);
    setDeltaSize([0, 0]);
  };

  const bind = useGesture({
    onDragStart: ({ event, movement: [mx, my] }) => {
      event.stopPropagation();
    },
    onDrag: ({ event, dragging, movement }) => {
      event.stopPropagation();
      setDeltaPos(movement);
      notifyChange();
    },
    onDragEnd: ({ event, dragging }) => {
      event.stopPropagation();
      notifySubmit();
    },
  });
  return (
    <>
      <div
        {...bind()}
        className={"border-primary border-2 absolute touch-none"}
        style={{
          top: y + dy,
          left: x + dx,
          width: width + dw,
          height: height + dh,
        }}
      />
      {CornersValues.map((corner, ix) => (
        <CornerDrag
          key={`corner-${corner.vector[0]}-${corner.vector[1]}`}
          onResize={({ dx, dy, dw, dh }) => {
            setDeltaPos([dx, dy]);
            setDeltaSize([dw, dh]);
            notifyChange();
          }}
          onSubmit={() => notifySubmit()}
          corner={corner}
          x={x + dx}
          y={y + dy}
          width={width + dw}
          height={height + dh}
        />
      ))}
    </>
  );
}

interface CornerDragProps extends BoxProps {
  corner: CornerData;
  onResize: (event: DeltaChange) => void;
  onSubmit: () => void;
}

export const CornerDrag = ({
  corner,
  onResize,
  onSubmit,
  ...tokenProps
}: CornerDragProps) => {
  const deltaHandler = getCornerDeltaHandler(corner);
  const {
    vector: [cx, cy],
  } = corner;
  const bind = useDrag(
    ({ down, movement, ctrlKey, event }) => {
      event.stopPropagation();
      const { deltaSize, deltaPosition } = deltaHandler(movement, ctrlKey);

      onResize({
        dx: deltaPosition.x,
        dy: deltaPosition.y,
        dw: deltaSize.x,
        dh: deltaSize.y,
      });

      if (!down) {
        onSubmit();
      }
    },
    {
      filterTaps: true,
    }
  );
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
        x: vx === -1 ? dw * -1 : 0,
        y: vy === -1 ? dh * -1 : 0,
      },
    };
  };
};
