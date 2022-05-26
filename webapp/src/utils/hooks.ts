import {Dispatch, SetStateAction, useCallback, useState} from "react";
import {Point} from "utils/Point";


export function usePosition( initialPosition?: Point): [number, number, (value: Point) => void ] {
    const [x, setX] = useState(initialPosition?.x??0);
    const [y, setY] = useState(initialPosition?.y??0);

    const setPosition = useCallback( ({x, y}: Point) => {
        setX(x)
        setY(y)
    }, [])

    return [x, y, setPosition]
}
