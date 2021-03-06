export interface Point {
  x: number;
  y: number;
}

export function addPoint(a: Point, b: Point) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}
