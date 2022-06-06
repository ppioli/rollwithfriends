import { useEffect, useRef } from "react";
import BaseLayerProps from "features/battleMap/BaseLayerProps";

interface GridProps extends BaseLayerProps {
  width: number;
  height: number;
  className: string;
}

export default function Grid({
  cellSize,
  offsetX,
  offsetY,
  width,
  height,
  className,
}: GridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // const { ref, width, height } = useResizeDetector();

  useEffect(() => {
    if (canvasRef.current) {
      console.log("Drawing grid");
      const startX = -(cellSize - (offsetX % cellSize));
      const startY = -(cellSize - (offsetY % cellSize));

      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        for (let i = startX; i < width; i += cellSize) {
          for (let j = startY; j < height; j += cellSize) {
            ctx.strokeRect(i, j, cellSize, cellSize);
          }
        }
      }
    }
  }, [canvasRef, offsetX, offsetY, cellSize, width, height]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}
