import {
  BattleMapEntityProps,
  SelectedBattleMapEntity,
} from "components/battleMap/entities/BattleMapEntity";
import { useCallback } from "react";
import { useFragment } from "react-relay";
import {
  BaseMapQueryToken$data,
  BaseMapQueryToken$key,
} from "components/battleMap/__generated__/BaseMapQueryToken.graphql";
import {
  BaseMapQuery,
  BaseMapQueryTokenFragment,
} from "components/battleMap/BaseMapQuery";

export interface TokenEntityProps {
  id: string;
  token: BaseMapQueryToken$key;
}

export default function TokenEntity({ id, token }: TokenEntityProps) {
  const onUpdate = useCallback((changes: BattleMapEntityProps) => {}, [id]);

  const data: BaseMapQueryToken$data = useFragment(
    BaseMapQueryTokenFragment,
    token
  );

  console.log("TokenEntity", data);

  return (
    <SelectedBattleMapEntity
      x={data.x}
      y={data.y}
      width={data.width}
      height={data.height}
      onUpdate={onUpdate}
    />
  );
}
