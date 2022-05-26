import { useEffect, useRef } from "react";
import { layer } from "components/battleMap/mapStyles";
import BaseLayerProps from "components/battleMap/BaseLayerProps";

export default function Grid({
  cellSize,
  offsetX,
  offsetY,
  width,
  height,
}: BaseLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>();

  // const { ref, width, height } = useResizeDetector();

  useEffect(() => {
    if (canvasRef.current) {
      console.log("Drawing grid");
      const startX = -(cellSize - (offsetX % cellSize));
      const startY = -(cellSize - (offsetY % cellSize));

      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      for (let i = startX; i < width; i += cellSize) {
        for (let j = startY; j < height; j += cellSize) {
          ctx.strokeRect(i, j, cellSize, cellSize);
        }
      }
    }
  }, [canvasRef, offsetX, offsetY, cellSize, width, height]);

  return (
    <div style={{ ...layer, border: "2px solid red" }}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}
