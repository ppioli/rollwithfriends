import {
  ResizeMoveBox,
  ResizeMoveBoxEvent,
} from "components/moveResizeHandler/MoveResizeBox";
import { ReactNode, useMemo, useRef } from "react";
import { useMapEntityUpdateMutation } from "features/mapEntity/MapEntity.graphql";
import { MapEntityUpdateInput } from "features/mapEntity/__generated__/MapEntityUpdateMutation.graphql";
import { useFragment } from "react-relay";
import { getEntitySize } from "features/battleMap/mapEntityLayer/GridSize";
import { EntitySelectBox_scene$key } from "features/battleMap/mapEntityLayer/__generated__/EntitySelectBox_scene.graphql";

const graphql = require("babel-plugin-relay/macro");

interface EntitySelectBoxProps {
  scale: number;
  sceneId: string;
  query: EntitySelectBox_scene$key;
  children: (offsetX: number, offsetY: number) => ReactNode;
}

export function EntitySelectBox({
  children,
  scale,
  sceneId,
  query,
}: EntitySelectBoxProps) {
  const update = useMapEntityUpdateMutation();

  const { cellSize, selected } = useFragment(
    graphql`
      fragment EntitySelectBox_scene on Scene {
        cellSize
        selected {
          id
          x
          y
          width
          height
          type
        }
      }
    `,
    query
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const selectionBounds: [[number, number], [number, number]] | null =
    useMemo(() => {
      const selectedEntities = selected ?? [];
      if (selectedEntities.length === 0) {
        return null;
      }
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

      selectedEntities.forEach((s) => {
        const [w, h] = getEntitySize(s, cellSize ?? 30);
        minX = Math.min(s.x, minX);
        minY = Math.min(s.y, minY);
        maxX = Math.max(s.x + w, maxX);
        maxY = Math.max(s.y + h, maxY);
      });

      return [
        [minX, minY],
        [maxX, maxY],
      ];
    }, [cellSize, selected]);

  const [[sx, sy], [ex, ey]] = selectionBounds ?? [
    [0, 0],
    [0, 0],
  ];

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

    const entities: MapEntityUpdateInput[] = (selected ?? []).map((e) => {
      const [width, height] = getEntitySize(e, cellSize ?? 0);
      return {
        id: e.id,
        x: Math.round(ssx + (e.x - ssx + dx) * rw),
        y: Math.round(ssy + (e.y - ssy + dy) * rh),
        width: Math.round(width * rw),
        height: Math.round(height * rh),
      };
    });

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
