import classNames from "classnames";
import React, { HTMLProps } from "react";

interface InputProps {
  name: string;
  label?: string;
  onBlur?: any;
  onChange?: any;
  layout?: string;
  input?: HTMLProps<HTMLInputElement>;
}

export const Input = React.forwardRef(
  ({ label, input, layout, onBlur, onChange, name }: InputProps, ref: any) => {
    const className =
      "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md";
    const {
      className: inputClassName,
      onChange: inputChange,
      onBlur: inputBlur,
      type,
      ...inputRest
    } = input || {};

    if (inputBlur || inputChange) {
      throw new Error("Not implemented exception");
    }

    return (
      <div className={layout ?? "w-full"}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
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
          className={classNames(className, inputClassName ?? "")}
        />
      </div>
    );
  }
);
