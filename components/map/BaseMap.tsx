import Grid from "components/map/Grid";
import useMapControl from "./useMapControl";
import {useCallback, useEffect, useRef} from "react";
import TokenLayer from "./TokenLayer";
import {layer, layerContainer} from "./mapStyles";

interface BaseMapProps {
    width: number,
    height: number,
}

export default function BaseMap({width, height}: BaseMapProps) {
    const containerRef = useRef<HTMLDivElement>();


    const {bind, x: offsetX, y: offsetY} = useMapControl({

        onDrag: ({x: dx, y: dy}) => {
            if (containerRef) {
                containerRef.current.style.setProperty("transform", `translate(${dx}px, ${dy}px)`)
            }
        }

    });

    const cellSize = 60;

    const layerProps = {
        height,
        width,
        offsetX,
        offsetY,
        cellSize
    }

    return <div {...bind()} style={{...layerContainer}}>
        <div style={{...layer, top: 10, left: 10}}>
            {`Position (${offsetX},${offsetY})`} <br/>
            {`Canvas size (${width},${height})`} <br/>
            {`Scale (${1})`} <br/>
        </div>
        <div ref={containerRef} style={layer}>
            <div style={layerContainer}>
                <Grid {...layerProps} />
                <TokenLayer {...layerProps}/>
            </div>

        </div>
    </div>

}





