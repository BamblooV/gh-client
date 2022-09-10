import React from "react";

import { GithubRepositoryModel } from "@models/gitHub/index";

import styles from "./RepoCard.module.scss";

export type RepoCardProps = { information: GithubRepositoryModel };

export const RepoCard: React.FC<RepoCardProps> = ({ information }) => {
  return (
    <div className={styles.repoInfo}>
      <div className={styles.title}>{information.name}</div>
      <div className={styles.flexContainer}>
        <div className={styles.author}>
          <img
            src={information.owner.avatarUrl}
            alt="Owner's avatar"
            width={80}
            height={80}
          />
          <div>{information.owner.name}</div>
        </div>
        <div className={styles.information}>
          <div> Description: {information.description}</div>
          <div>За репозиторием наблюдают: {information.watchersCount}</div>
          <div>Звезд у репозитория: {information.stargazersCount}</div>
          <div>Форков репозитория: {information.forks}</div>
          {information.branches && (
            <div>Количество ветвей: {information.branches}</div>
          )}
        </div>
      </div>
    </div>
  );
};
