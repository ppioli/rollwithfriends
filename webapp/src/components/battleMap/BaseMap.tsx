import Grid from "components/battleMap/Grid";
import useMapControl from "components/battleMap/useMapControl";
import {useRef} from "react";
import TokenLayer from "components/battleMap/TokenLayer";
import {layer, layerContainer} from "components/battleMap/mapStyles";
import Toolbar from "components/battleMap/toolbar/Toolbar";
import {loadQuery, graphql} from 'react-relay';
import RelayEnvironment from "../../RelayEnvironment";

interface BaseMapProps {
    width: number;
    height: number;
}

export const BaseMapQuery = graphql`
    query BaseMapQuery {
        tokens {
            id
            x
            y
            width
            height
        }
    }
`

export default function BaseMap({width, height}: BaseMapProps) {
    const containerRef = useRef<HTMLDivElement>();

    const data = loadQuery(RelayEnvironment, BaseMapQuery);

    console.log(data);

    const {
        bind,
        x: offsetX,
        y: offsetY,
    } = useMapControl({
        onDrag: ({x: dx, y: dy}) => {
            if (containerRef) {
                containerRef.current.style.setProperty(
                    "transform",
                    `translate(${dx}px, ${dy}px)`
                );
            }
        },
    });

    const cellSize = 60;

    const layerProps = {
        height,
        width,
        offsetX,
        offsetY,
        cellSize,
    };

    return (
        <div {...bind()} style={{...layerContainer}}>
            <div
                style={{...layer, top: 10, left: 10, right: 100}}
                className={"text-right"}
            >
                {`Position (${offsetX},${offsetY})`} <br/>
                {`Canvas size (${width},${height})`} <br/>
                {`Scale (${1})`} <br/>
            </div>
            <div ref={containerRef} style={layer}>
                <div style={layerContainer}>
                    <Grid {...layerProps} />
                    <TokenLayer {...layerProps} />
                </div>
            </div>
            <Toolbar/>
        </div>
    );
}
