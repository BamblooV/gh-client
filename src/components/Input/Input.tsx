import React from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value?: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className = "",
  ...attributes
}) => {
  const inputHandler = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    onChange(target.value);
  };

  return (
    <input
      className={classNames(
        styles.input,
        { [styles.input_disabled]: attributes.disabled },
        className
      )}
      type="text"
      value={value}
      onChange={inputHandler}
      {...attributes}
    />
  );
};
