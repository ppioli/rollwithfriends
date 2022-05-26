import { CSSProperties } from "react";
import { useAppDispatch } from "store";
import { addToken } from "features/token/tokenSlice";

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

export default function Toolbar() {
  const dispatch = useAppDispatch();

  return (
    <div style={style}>
      <div className={"d-flex"}>
        <button
          type={"button"}
          className={"btn-primary"}
          onClick={() => dispatch(addToken(testToken))}
        >
          Agregar token
        </button>
      </div>
    </div>
  );
}
