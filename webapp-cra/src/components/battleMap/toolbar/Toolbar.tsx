import { useMapEntityAddMutation } from "components/mapEntity/MapEntity.graphql";
import { CSSProperties } from "react";

const style: CSSProperties = {
  position: "absolute",
  top: 10,
  left: 10,
  zIndex: 1000000,
};

const testToken = {
  x: 500,
  y: 500,
  width: 30,
  height: 30,
};

interface ToolbarProps {
  sceneId: string;
}

export default function Toolbar({ sceneId }: ToolbarProps) {
  const addEntity = useMapEntityAddMutation(sceneId);

  return (
    <div style={style}>
      <div className={"d-flex"}>
        <button
          type={"button"}
          className={"btn-primary"}
          onClick={() => addEntity({ x: 100, y: 100, width: 100, height: 100 })}
        >
          Agregar token
        </button>
      </div>
    </div>
  );
}
