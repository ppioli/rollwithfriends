import { HTMLProps, ReactNode, useState } from "react";

export interface TabPanelTab<T> {
  label: string;
  component: ReactNode;
}

interface TabPanelProps extends Omit<HTMLProps<HTMLDivElement>, "children"> {
  children: TabPanelTab<any>[];
}

export function TabPanel({ children, ...divProps }: TabPanelProps) {
  const [selected, setSelected] = useState(0);

  if (children.length === 0) {
    return null;
  }

  return (
    <div {...divProps}>
      <div className={"w-full h-full flex flex-col"}>
        <div className={"flex"}>
          {children.map((t, ix) => (
            <button
              key={ix}
              type={"button"}
              className={"btn btn-primary grow"}
              onClick={() => setSelected(ix)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {children[selected].component}
      </div>
    </div>
  );
}
