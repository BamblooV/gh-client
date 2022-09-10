import React from "react";

import styles from "./Card.module.scss";
import star from "./Vector.svg";

export type CardProps = {
  image: string;
  title: string;
  owner: string;
  htmlLink: string;
  updated: Date;
  starCount: number;
  onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  owner,
  htmlLink,
  updated,
  starCount,
  onClick,
}) => {
  return (
    <div className={styles["git-repo-tile"]} onClick={onClick}>
      <img
        width={80}
        height={80}
        className={styles.avatar}
        src={image}
        alt="Repository Avatar"
      />
      <div className={styles.description}>
        <div className={styles.title}>{title}</div>
        <a className={styles.link} href={htmlLink}>
          {owner}
        </a>

        <div className={styles.info}>
          <div>
            <span className={styles.star}>
              <img src={star} alt="Repository Avatar" /> {starCount}
            </span>
          </div>
          <div>
            Updated &nbsp;
            {updated
              .toLocaleDateString("en-EN", {
                day: "numeric",
                month: "short",
              })
              .split(" ")
              .reverse()
              .join(" ")}
          </div>
        </div>
      </div>
    </div>
  );
};
