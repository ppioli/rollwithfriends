import { useCallback } from "react";
import { layerContainer } from "components/battleMap/mapStyles";
import BaseLayerProps from "components/battleMap/BaseLayerProps";
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

  return (
    <div style={{ ...layerContainer, top: offsetY, left: offsetX }}>
      {tokens.map((token) => (
        <TokenEntity id={token.id} key={`token-${token.id}`} />
      ))}
    </div>
  );
}
