import {
  ResizeMoveBox,
  ResizeMoveBoxEvent,
} from "components/moveResizeHandler/MoveResizeBox";
import { useMapEntityContext } from "features/battleMap/mapEntityLayer/MapEntityContext";
import { ReactNode, useRef } from "react";
import { useMapEntityUpdateMutation } from "features/mapEntity/MapEntity.graphql";
import { MapEntityUpdateInput } from "features/mapEntity/__generated__/MapEntityUpdateMutation.graphql";

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
  const [[sx, sy], [ex, ey]] = selectionBounds;
  const onChange = ({ dx, dy, rw, rh }: ResizeMoveBoxEvent) => {
    if (containerRef.current !== null) {
      containerRef.current.style.transform = `translate(${dx}px, ${dy}px) scaleX(${rw}) scaleY(${rh})`;
    }
  };

  const onSubmit = ({ dx, dy, rw, rh }: ResizeMoveBoxEvent) => {
    const input: MapEntityUpdateInput[] = getSelected().map((e) => ({
      id: e.id,
      x: sx + Math.round((e.x - sx + dx) * rw),
      y: sy + Math.round((e.y - sy + dy) * rh),
      width: Math.round(e.width * rw),
      height: Math.round(e.height * rh),
    }));

    update({ input });

    if (containerRef.current !== null) {
      containerRef.current.style.transform = ``;
    }
  };

  return (
    <>
      <div
        className="absolute"
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
