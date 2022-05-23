import Grid from "components/map/Grid";
import {useGesture} from "@use-gesture/react";
import {useState} from "react";
import {Point} from "utils/Point";

export default function BaseMap() {

    const bind = useMapControl();


    return <div {...bind()}>
        <Grid/>
    </div>

}

function useMapControl() {
    const [dragStart, setDragStart] = useState<Point>(null);

    const bind = useGesture({
        onDragStart: (evt) => {
            if (evt.ctrlKey) {
                const [x, y] = evt.xy;
                setDragStart({x, y})
            }

        },
        onDrag: (evt) => {
            if (dragStart !== null) {
                const {x, y} = dragStart;
                const [nx, ny] = evt.xy;
                console.log(x - nx, y - ny)
            }
        },
        onDragEnd: () => setDragStart(null),
        onWheel: (evt) => console.log(evt),
        onScroll: (evt) => console.log(evt),
    }, {
        enabled: true, drag: {}
    })

    return {
        bind,
    }
}



