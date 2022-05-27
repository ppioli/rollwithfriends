import { layerContainer } from "components/battleMap/mapStyles";
import BaseLayerProps from "components/battleMap/BaseLayerProps";
import TokenEntity from "components/battleMap/entities/TokenEntity";
import Token from "features/token/Token.model";
import {
  BaseMapQuery as BaseMapQueryType,
  BaseMapQuery$data,
} from "components/battleMap/__generated__/BaseMapQuery.graphql";

import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { BaseMapQuery } from "components/battleMap/BaseMapQuery";

interface TokenLayerProps extends BaseLayerProps {
  // queryRef: PreloadedQuery<BaseMapQueryType>;
  queryRef: PreloadedQuery<BaseMapQueryType>;
}

export default function TokenLayer({
  offsetX,
  offsetY,
  queryRef,
}: TokenLayerProps) {
  // const result = usePreloadedQuery<BaseMapQueryType>(BaseMapQuery, queryRef);
  //
  // console.log(result);
  const data = usePreloadedQuery<BaseMapQueryType>(BaseMapQuery, queryRef);

  console.log(data);

  return (
    <div style={{ ...layerContainer, top: offsetY, left: offsetX }}>
      {data &&
        data.tokens.map((token) => <TokenEntity id={token.id} token={token} />)}
    </div>
  );
}
