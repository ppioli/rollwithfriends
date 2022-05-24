import {TokenProps} from "./token/Token";
import React, {CSSProperties, useCallback} from "react";
import {usePosition} from "../../utils/hooks";
import corners, {CornerData, CornersValues} from "../../utils/Corners";
import {useDrag} from "@use-gesture/react";
import {Point} from "../../utils/Point";

const resizeHandlerStyle: CSSProperties = {
    position: "absolute",
    border: "1px solid black",
    touchAction: "none"
}

const resizeHandlerSize = 10;

interface MoveResizeHandlerProps {
    onUpdate: (props: TokenProps) => void;
}


const withMoveResizeHandler = (
    component: {
        (props: TokenProps): Exclude<React.ReactNode, undefined>;
        displayName?: string;
    },
    componentName = component.displayName ?? component.name
): {
    (props: TokenProps & MoveResizeHandlerProps): JSX.Element;
    displayName: string;
} => {

    function WithSampleHoc({onUpdate: updateToken, ...tokenProps}: TokenProps & MoveResizeHandlerProps) {
        const {x, y, width, height} = tokenProps;
        //Do something special to justify the HoC.
        const [dx, dy, setDeltaPosition] = usePosition({x: 0, y: 0})
        const [dw, dh, setDeltaSize] = usePosition({x: 0, y: 0})

        const updatePos = useCallback((pos: Point) => setDeltaPosition(pos), [setDeltaPosition])
        const updateSize = useCallback((deltaSize: Point, deltaPos: Point) => {
            setDeltaSize(deltaSize)
            setDeltaPosition(deltaPos)
        }, [])

        const onUpdate = (token: TokenProps) => {
            setDeltaPosition({x: 0, y: 0})
            setDeltaSize({x: 0, y: 0})
            updateToken(token)
        }

        const computedProps: TokenProps = {
            x: x + dx,
            y: y + dy,
            width: width + dw,
            height: height + dh,
        }

        return <>
            {component(computedProps)}
            <ResizeMoveBox {...computedProps} onMove={updatePos} onResize={updateSize} onUpdate={onUpdate}/>
        </> as JSX.Element;
    }

    WithSampleHoc.displayName = `withMoveResizeHandler(${componentName})`;

    let wrappedComponent = React.memo(WithSampleHoc);

    //copyStaticProperties(component, wrappedComponent);

    return wrappedComponent as typeof WithSampleHoc
};

interface ResizeMoveBoxProps extends TokenProps {
    onMove: (delta: Point) => void;
    onResize: (deltaSize: Point, deltaPosition: Point) => void;
    onUpdate: (props: TokenProps) => void;
}

function ResizeMoveBox({x, y, width, height, onMove, onResize, onUpdate}: ResizeMoveBoxProps) {

    const bind = useDrag(({down, movement: [mx, my]}) => {
        console.log(mx, my)
        onMove({x: mx, y: my})
        if (!down) {
            onUpdate({
                x,
                y,
                width,
                height
            })
        }
    }, {

        preventDefault: true,
        eventOptions: {
            passive: false,
            capture: true
        }
    });

    return <>
        <div {...bind()} style={{
            ...resizeHandlerStyle,
            top: y,
            left: x,
            width: width,
            height: height
        }}>
        </div>
        {CornersValues.map((corner) => <CornerDrag onResize={onResize} onUpdate={onUpdate} corner={corner} x={x} y={y}
                                                   width={width} height={height}/>)}
    </>
}

interface CornerDragProps extends TokenProps {
    corner: CornerData,
    onResize: (deltaSize: Point, deltaPosition: Point) => void;
    onUpdate: (props: TokenProps) => void;
}

export const CornerDrag = ({corner, onResize, onUpdate, ...tokenProps}: CornerDragProps) => {
    // const [dx, dy, setDeltaPos]= usePosition()
    const deltaHandler = getCornerDeltaHandler(corner);
    const {vector: [cx, cy]} = corner;
    const bind = useDrag(({down, movement, ctrlKey}) => {
        const {deltaSize, deltaPosition} = deltaHandler(movement, ctrlKey)
        onResize(deltaSize, deltaPosition)
        if (!down) {
            onUpdate({
                x,
                y,
                width,
                height
            })
        }
    }, {

        preventDefault: true,
        eventOptions: {
            passive: false,
            capture: true
        }
    });
    const {x, y, width, height} = tokenProps;
    return <div {...bind()} style={{
        ...resizeHandlerStyle,
        top: y + height / 2 + cy * height / 2 - resizeHandlerSize / 2,
        left: x + width / 2 + cx * width / 2 - resizeHandlerSize / 2,
        width: resizeHandlerSize,
        height: resizeHandlerSize,
    }}/>
}

export default withMoveResizeHandler;

const getCornerDeltaHandler = ({vector: [vx, vy]}: CornerData) => {

    return ([cx, cy]: [number, number], keepAspectRatio: boolean = false) => {
        const dw = cx * vx;
        const dh = cy * vy;

        console.log(vx, vy)
        return {
            deltaSize: {
                x: dw,
                y: dh,
            },
            deltaPosition: {
                x: vx == -1 ? dw * -1 : 0,
                y: vy == -1 ? dh * -1 : 0,
            }
        }
    }
}
