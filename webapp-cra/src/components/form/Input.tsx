import classNames from "classnames";
import React, { HTMLProps } from "react";

interface InputProps {
  name: string;
  label?: string;
  onBlur?: any;
  onChange?: any;
  layout?: string;
  input?: HTMLProps<HTMLInputElement> & { directory?: boolean };
}

export const Input = React.forwardRef(
  ({ label, input, layout, onBlur, onChange, name }: InputProps, ref: any) => {
    const {
      className: inputClassName,
      onChange: inputChange,
      onBlur: inputBlur,
      directory,
      type,
      ...inputRest
    } = input || {};

    const dirProps: any = {};
    if (directory) {
      if (type !== "file") {
        console.warn("Defined a directory input without file type");
      }
      dirProps["webkitdirectory"] = "";
      dirProps["mozdirectory"] = "";
      dirProps["directory"] = "";
    }

    if (inputBlur || inputChange) {
      throw new Error("Not implemented exception");
    }

    return (
      <div className={layout ?? "w-full"}>
        {label && (
          <label htmlFor={name} className="block input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type ?? "text"}
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          {...inputRest}
          {...dirProps}
          className={classNames("input", inputClassName ?? "")}
        />
      </div>
    );
  }
);
