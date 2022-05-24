import React, {CSSProperties} from "react";
import TokenModel from "models/Token.model";
import withTokenHandler from "../withTokenHandler";

export interface TokenProps  {
    x: number,
    y: number,
    width: number,
    height: number,

}

function Token({x, y, width, height}: TokenProps) {

    const style: CSSProperties ={
        position: "relative",
        top: y,
        left: x,
        width,
        height,
    }


    return <img style={style} src={"https://i.pinimg.com/originals/6c/12/e7/6c12e78a564a65f2c4d56556a1ff922c.png"}  alt={`token`}/>

}

export default React.memo(Token)

export const SelectedToken = withTokenHandler(Token)
