import { HTMLProps, ReactNode, useCallback, useState } from "react";
import classNames from "classnames";

export interface TabPanelTab {
  label: string;
  component: ReactNode;
  enabled?: boolean;
  onLoad?: () => void;
}

interface TabPanelProps extends Omit<HTMLProps<HTMLDivElement>, "children"> {
  children: TabPanelTab[];
  horizontal?: boolean;
  container?: string;
}

export function TabPanel({
  children,
  container,
  horizontal = false,
  ...divProps
}: TabPanelProps) {
  const [selected, setSelected] = useState(0);
  const enabledChildren = children.filter((c) => c.enabled ?? true);

  const onSelect = useCallback(
    (ix: number) => {
      const onLoad = children[ix].onLoad;
      if (onLoad) {
        onLoad();
      }
      setSelected(ix);
    },
    [children]
  );

  if (enabledChildren.length === 0) {
    return null;
  }
  if (!(children[selected].enabled ?? true)) {
    setSelected(children.findIndex((c) => c.enabled ?? true));
  }

  return (
    <div {...divProps}>
      <div
        className={classNames("w-full h-full flex ", {
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
          {children.map((t, ix) => {
            if (t.enabled === false) {
              return null;
            }
            return (
              <button
                key={ix}
                type={"button"}
                className={classNames("btn btn-menu", {
                  active: selected === ix,
                  grow: !horizontal,
                })}
                onClick={() => onSelect(ix)}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <div className={classNames(container, "grow")}>
          {children[selected].component}
        </div>
      </div>
    </div>
  );
}
