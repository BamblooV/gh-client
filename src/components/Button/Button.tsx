import React from "react";

import { WithLoader } from "@components/WithLoader";
import classNames from "classnames";

import styles from "./Button.module.scss";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
  squared?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  color = ButtonColor.primary,
  children,
  className,
  squared = false,
  ...attributes
}) => (
  <button
    className={classNames(
      styles[`button_color-${color}`],
      styles.button,
      { [styles.button_disabled]: attributes.disabled },
      { [styles.button_loading]: loading },
      { [styles["search-button"]]: squared },
      className
    )}
    disabled={attributes?.disabled || loading}
    {...attributes}
  >
    <WithLoader loading={loading}>{children}</WithLoader>
  </button>
);
