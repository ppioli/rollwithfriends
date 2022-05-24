import {useCallback, useState} from "react";
import Token, {SelectedToken, TokenProps} from "./token/Token";
import {layerContainer} from "./mapStyles";
import BaseLayerProps from "./BaseLayerProps";
import _ from "lodash";
import token from "./token/Token";

const testToken: TokenProps = {
    x: 10,
    y: 10,
    width: 30,
    height: 30
}

export default function TokenLayer({cellSize, offsetX, offsetY}: BaseLayerProps){
    const [tokens, setTokens] = useState<TokenProps[]>([testToken]);

    const updateToken = useCallback( ( ix: number, props: TokenProps ) => {
        console.log("Updated", props)
        const newTokens = _.cloneDeep(tokens);
        Object.assign(newTokens[ix], props);
        setTokens(newTokens)
    }, [tokens, setTokens])

    return <div style={{...layerContainer, top: offsetY, left: offsetX}}>
        {tokens.map( (token, ix) => <SelectedToken onUpdate={(props) => updateToken(ix, props)} key={ix} {...token} /> )}
    </div>
}
