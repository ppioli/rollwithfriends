import {
  ResizeMoveBox,
  ResizeMoveBoxEvent,
} from "components/moveResizeHandler/MoveResizeBox";
import { useMapEntityContext } from "features/battleMap/mapEntityLayer/MapEntityContext";
import { ReactNode, useRef } from "react";
import { useMapEntityUpdateMutation } from "features/mapEntity/MapEntity.graphql";

interface EntitySelectBoxProps {
  children: (offsetX: number, offsetY: number) => ReactNode;
}

export function EntitySelectBox({ children }: EntitySelectBoxProps) {
  const { selectionBounds, getSelected } = useMapEntityContext();
  const update = useMapEntityUpdateMutation();
  const containerRef = useRef<HTMLDivElement>(null);

  if (selectionBounds === null) {
    return null;
  }

  const onChange = ({ dx, dy, rw, rh }: ResizeMoveBoxEvent) => {
    console.log("Changing: ", dx, dy, rw, rh);
    if (containerRef.current !== null) {
      containerRef.current.style.transform = `translate(${dx}px, ${dy}px) scaleX(${rw}) scaleY(${rh})`;
    }
  };

  const onSubmit = ({ dx, dy, rw, rh }: ResizeMoveBoxEvent) => {
    getSelected().forEach((e) => {
      update({
        id: e.id,
        x: e.x + dx,
        y: e.y + dy,
        width: e.width * rw,
        height: e.height * rh,
      });
    });
    if (containerRef.current !== null) {
      containerRef.current.style.transform = ``;
    }
  };

  const [[sx, sy], [ex, ey]] = selectionBounds;
  return (
    <>
      <div
        className="absolute "
        style={{ top: sy, left: sx }}
        ref={containerRef}
      >
        {children(sx, sy)}
      </div>
      <ResizeMoveBox
        x={sx}
        y={sy}
        width={ex - sx}
        height={ey - sy}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </>
  );
}
