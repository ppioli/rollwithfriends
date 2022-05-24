import { useCallback } from "react";
import { layerContainer } from "./mapStyles";
import BaseLayerProps from "./BaseLayerProps";
import { selectAllTokens, updateToken } from "features/token/tokenSlice";
import { useAppDispatch, useAppSelector } from "store";
import Token from "features/token/Token.model";
import TokenEntity from "components/battleMap/entities/TokenEntity";

const testToken: Omit<Token, "id"> = {
  x: 10,
  y: 10,
  width: 30,
  height: 30,
};

export default function TokenLayer({ offsetX, offsetY }: BaseLayerProps) {
  const tokens = useAppSelector(selectAllTokens);
  const dispatch = useAppDispatch();

  const onUpdate = useCallback(
    (id: number, changes: Omit<Token, "id">) => {
      console.log("Updated", changes);
      dispatch(updateToken({ id, changes }));
      // const newTokens = _.cloneDeep(tokens);
      // Object.assign(newTokens[ix], props);
      // setTokens(newTokens)
    },
    [dispatch]
  );

  return (
    <div style={{ ...layerContainer, top: offsetY, left: offsetX }}>
      {tokens.map((token) => (
        <TokenEntity id={token.id} key={`token-${token.id}`} />
      ))}
    </div>
  );
}
