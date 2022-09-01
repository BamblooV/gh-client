import React from "react";

import styles from "./RepoCard.module.scss";

export type RepoCardProps = {
  title: string;
  avatarUrl: string;
  ownerName: string;
  description: string;
  watchersCount: number;
  stargazersCount: number;
  forksCount: number;
  branchesCount: number;
};

export const RepoCard: React.FC<RepoCardProps> = ({
  title,
  avatarUrl,
  ownerName,
  description,
  watchersCount,
  stargazersCount,
  forksCount,
  branchesCount,
}) => {
  return (
    <div className={styles.repoInfo}>
      <div className={styles.title}>{title}</div>
      <div className={styles.flexContainer}>
        <div className={styles.author}>
          <img src={avatarUrl} alt="Owner's avatar" width={80} height={80} />
          <div>{ownerName}</div>
        </div>
        <div className={styles.information}>
          <div> Description: {description}</div>
          <div>За репозиторием наблюдают: {watchersCount}</div>
          <div>Звезд у репозитория: {stargazersCount}</div>
          <div>Форков репозитория: {forksCount}</div>
          <div>Количество ветвей: {branchesCount}</div>
        </div>
      </div>
    </div>
  );
};
