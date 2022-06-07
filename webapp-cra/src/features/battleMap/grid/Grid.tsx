import { useEffect, useRef } from "react";
import BaseLayerProps from "features/battleMap/BaseLayerProps";

interface GridProps extends BaseLayerProps {
  width: number;
  height: number;
  className: string;
}

export default function Grid({
  scale,
  cellSize,
  offsetX,
  offsetY,
  width,
  height,
  className,
}: GridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      console.log("Drawing grid");
      let scaleCellSize = cellSize * scale;

      while (scaleCellSize < 10) {
        scaleCellSize *= 5;
      }
      const startX = -(scaleCellSize - (offsetX % scaleCellSize));
      const startY = -(scaleCellSize - (offsetY % scaleCellSize));

      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        for (let i = startX; i < width; i += scaleCellSize) {
          for (let j = startY; j < height; j += scaleCellSize) {
            ctx.strokeRect(i, j, scaleCellSize, scaleCellSize);
          }
        }
      }
    }
  }, [canvasRef, offsetX, offsetY, cellSize, width, height, scale]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}
