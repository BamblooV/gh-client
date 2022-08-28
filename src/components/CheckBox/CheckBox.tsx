import React from "react";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked = false,
  ...attributes
}) => {
  const onChangeHandler = (event: React.SyntheticEvent) => {
    // @ts-ignore
    onChange(event.target.checked);
  };

  return (
    <input
      type="checkbox"
      onChange={onChangeHandler}
      checked={checked}
      {...attributes}
    />
  );
};
