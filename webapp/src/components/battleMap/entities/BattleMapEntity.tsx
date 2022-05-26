import React, { CSSProperties } from "react";
import withTokenHandler from "components/battleMap/withTokenHandler";

export interface BattleMapEntityProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

function BattleMapEntity({ x, y, width, height }: BattleMapEntityProps) {
  const style: CSSProperties = {
    position: "relative",
    top: y,
    left: x,
    width,
    height,
  };

  return (
    <img
      style={style}
      src={
        "https://i.pinimg.com/originals/6c/12/e7/6c12e78a564a65f2c4d56556a1ff922c.png"
      }
      alt={`token`}
    />
  );
}

export default React.memo(BattleMapEntity);

export const SelectedBattleMapEntity = withTokenHandler(BattleMapEntity);
