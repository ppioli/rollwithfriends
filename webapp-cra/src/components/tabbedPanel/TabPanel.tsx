import { HTMLProps, ReactNode, useState } from "react";
import classNames from "classnames";

export interface TabPanelTab<T> {
  label: string;
  component: ReactNode;
  enabled?: boolean;
}

interface TabPanelProps extends Omit<HTMLProps<HTMLDivElement>, "children"> {
  children: TabPanelTab<any>[];
  horizontal?: boolean;
}

export function TabPanel({
  children,
  horizontal = false,
  ...divProps
}: TabPanelProps) {
  const [selected, setSelected] = useState(0);
  const enabledChildren = children.filter((c) => c.enabled ?? true);
  if (enabledChildren.length === 0) {
    return null;
  }
  if (!(children[selected].enabled ?? true)) {
    setSelected(children.findIndex((c) => c.enabled ?? true));
  }

  return (
    <div {...divProps}>
      <div
        className={classNames("w-full h-full flex", {
          "flex-col": !horizontal,
          "flex-row": horizontal,
        })}
      >
        <div
          className={classNames("flex gap-2 p-2 bg-darkest", {
            "flex-row": !horizontal,
            "flex-col content-start justify-start": horizontal,
          })}
        >
          {enabledChildren.map((t, ix) => (
            <button
              key={ix}
              type={"button"}
              className={classNames("btn btn-menu", {
                active: selected === ix,
                grow: !horizontal,
              })}
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
