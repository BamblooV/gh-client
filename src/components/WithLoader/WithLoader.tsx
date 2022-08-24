import React from "react";

import { Loader, LoaderSize } from "../Loader/Loader";
import styles from "./WithLoader.module.scss";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;
export const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
}) => {
  return (
    <div className={styles.container}>
      {loading && <Loader size={LoaderSize.s} />}
      {children}
    </div>
  );
};
