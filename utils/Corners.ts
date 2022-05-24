export const CornersValues: CornerData[] = [
    {vector: [-1, -1], lock: [false, false], move:[-1,-1]},
    {vector: [0, -1],lock: [true, false], move:[-1,0]},
    {vector: [1, -1],lock: [false, false], move:[0,1]},
    {vector: [1, 0],lock: [false, true], move:[0,0]},
    {vector: [1, 1],lock: [false, false], move:[0,0]},
    {vector: [0, 1],lock: [true, false], move:[0,0]},
    {vector: [-1, 1],lock: [false, false], move:[0,1]},
    {vector: [-1, 0],lock: [false, true], move:[1,0]},
]

export interface CornerData {
    vector: [number, number],
    lock: [boolean, boolean],
    move: [number, number]
}

enum Corners {
    TOP_LEFT,
    TOP,
    TOP_RIGHT,
    RIGHT,
    BOTTOM_RIGHT,
    BOTTOM,
    BOTTOM_LEFT,
    LEFT,
}

export default Corners;
