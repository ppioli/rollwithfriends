import { useMapEntityAddMutation } from "components/mapEntity/MapEntity.graphql";
import { CSSProperties } from "react";

const testToken = {
  x: 500,
  y: 500,
  width: 30,
  height: 30,
};

interface ToolbarProps {
  sceneId: string;
  className: string;
}

export default function Toolbar({ sceneId, className }: ToolbarProps) {
  const addEntity = useMapEntityAddMutation();

  return (
    <div className={className}>
      <div className={"d-flex flex-col"}>
        <button
          type={"button"}
          className={"btn btn-primary rounded-full"}
          onClick={() =>
            addEntity({ sceneId, x: 100, y: 100, width: 100, height: 100 })
          }
        >
          +
        </button>
      </div>
    </div>
  );
}
