import { useResizeDetector } from "react-resize-detector";
import { ReactNode } from "react";
import classNames from "classnames";

export interface FillSizeProps {
  children: (width: number, height: number) => ReactNode;
  className?: string;
}

export function FillSize({ children, className }: FillSizeProps) {
  const { ref, width, height } = useResizeDetector();

  const render = width && height;

  return (
    <div ref={ref} className={classNames("w-full h-full", className)}>
      {render && children(width, height)}
    </div>
  );
}
