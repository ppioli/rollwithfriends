import {
  ResizeMoveBox,
  ResizeMoveBoxEvent,
} from "components/moveResizeHandler/MoveResizeBox";
import { useMapEntityContext } from "features/battleMap/mapEntityLayer/MapEntityContext";
import { ReactNode, useRef } from "react";
import { useMapEntityUpdateMutation } from "features/mapEntity/MapEntity.graphql";
import { MapEntityUpdateInput } from "features/mapEntity/__generated__/MapEntityUpdateMutation.graphql";

interface EntitySelectBoxProps {
  scale: number;
  children: (offsetX: number, offsetY: number) => ReactNode;
  sceneId: string;
}

export function EntitySelectBox({
  children,
  scale,
  sceneId,
}: EntitySelectBoxProps) {
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

  const onSubmit = ({ dx: sdx, dy: sdy, rw, rh }: ResizeMoveBoxEvent) => {
    // revert scaling on dx & dy. rh & rw are ratios and are not affected by scale
    const dx = sdx / scale;
    const dy = sdy / scale;

    const ssx = sx + dx;
    const ssy = sy + dy;
    console.info("delta mov ", dx, dy);

    const entities: MapEntityUpdateInput[] = getSelected().map((e) => ({
      id: e.id,
      x: Math.round(ssx + (e.x - ssx + dx) * rw),
      y: Math.round(ssy + (e.y - ssy + dy) * rh),
      width: Math.round(e.width * rw),
      height: Math.round(e.height * rh),
    }));

    update({
      input: {
        entities,
        sceneId,
      },
    });

    if (containerRef.current !== null) {
      containerRef.current.style.transform = ``;
    }
  };

  return (
    <>
      <div
        className="absolute"
        style={{ top: sy * scale, left: sx * scale }}
        ref={containerRef}
      >
        {children(sx, sy)}
      </div>
      <ResizeMoveBox
        x={sx * scale}
        y={sy * scale}
        width={(ex - sx) * scale}
        height={(ey - sy) * scale}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </>
  );
}
