import {useEffect, useRef, useState} from "react";


export default function Grid(){
    const [width, setWidth] = useState(30);
    const [height, setHeight] = useState(30);
    const [cellSize, setCellSize] = useState(30);

    const canvasRef = useRef<HTMLCanvasElement>();

    useEffect(()=>{
        if(canvasRef.current){
            drawGrid(canvasRef.current, width, height, cellSize)
        }
    }, [canvasRef, width, height, cellSize])

    return <canvas ref={canvasRef} width={width*cellSize} height={height*cellSize}>

    </canvas>
}


function drawGrid( canvas: HTMLCanvasElement, width: number, height: number, size: number ) {
    const ctx = canvas.getContext("2d");
    for(let i = 0; i < width; i++ ){
        for(let j = 0; j < height; j++ ){
            ctx.strokeRect( i * size, j * size, size, size)
        }
    }
}
