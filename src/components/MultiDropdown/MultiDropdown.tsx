import React from "react";

import classNames from "classnames";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  pluralizeOptions,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);

  React.useEffect(() => {
    setIsOpened(false);
  }, [disabled]);

  const optionClickHandler = (e: React.SyntheticEvent) => {
    // @ts-ignore
    const keyValue = e.nativeEvent.target?.dataset.val;
    const isInValue = value.find((item) => item.key === keyValue);
    if (isInValue) {
      onChange(value.filter((item) => item.key !== keyValue));
    } else {
      const newOption = options.find((item) => item.key === keyValue);
      if (newOption) onChange([...value, newOption]);
      onChange([...value]);
    }
  };

  const openToggle = () => {
    if (disabled) return;
    setIsOpened(!isOpened);
  };

  return (
    <>
      <div onClick={openToggle}>{pluralizeOptions(value)}</div>
      {isOpened && (
        <ul>
          {options.map((item) => {
            return (
              <li
                key={item.key}
                data-val={item.key}
                onClick={optionClickHandler}
              >
                {item.value}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
