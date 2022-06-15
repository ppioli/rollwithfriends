interface ToolbarProps {
  sceneId: string;
  className: string;
}

export default function Toolbar({ sceneId, className }: ToolbarProps) {
  return (
    <div className={className}>
      <div className={"d-flex flex-col"}>
        <button
          type={"button"}
          className={"btn btn-primary rounded-full"}
          onClick={() => {}}
        >
          +
        </button>
      </div>
    </div>
  );
}
