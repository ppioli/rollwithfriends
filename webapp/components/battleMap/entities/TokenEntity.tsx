import { useAppDispatch, useAppSelector } from "store";
import { selectTokenById, updateToken } from "features/token/tokenSlice";
import {
  BattleMapEntityProps,
  SelectedBattleMapEntity,
} from "components/battleMap/entities/BattleMapEntity";
import { useCallback } from "react";

export interface TokenEntityProps {
  id: number;
}

export default function TokenEntity({ id }: TokenEntityProps) {
  const { x, y, width, height } = useAppSelector((state) =>
    selectTokenById(state, id)
  );
  const dispatch = useAppDispatch();

  const onUpdate = useCallback(
    (changes: BattleMapEntityProps) => {
      dispatch(updateToken({ id, entity: { id, ...changes} }));
    },
    [dispatch, id]
  );

  return (
    <SelectedBattleMapEntity
      x={x}
      y={y}
      width={width}
      height={height}
      onUpdate={onUpdate}
    />
  );
}
