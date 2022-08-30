import React, { useState, useEffect } from "react";

import { Button } from "@components/Button";
import { Loader, LoaderSize } from "@components/Loader";
import { API_ENDPOINTS } from "@config/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./Repo.module.scss";

type GIT_RESPONSE = {
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  watchers_count: number;
  forks: number;
  stargazers_count: number;
};

type REPOSITORY_INFO = {
  name: string;
  ownerLogin: string;
  ownerAvatarUrl: string;
  description: string;
  branches: number;
  watchers_count: number;
  forks: number;
  stargazers_count: number;
};

export const Repo = () => {
  const { owner, name } = useParams();
  const [information, setInformation] = useState<REPOSITORY_INFO | null>(null);
  const [noInfo, setNoInfo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API_ENDPOINTS.REPOS + `/${owner}/${name}`
        );

        const data: GIT_RESPONSE = response.data;

        const branchesAmount = (
          await axios.get(API_ENDPOINTS.REPOS + `/${owner}/${name}/branches`)
        ).data.length;

        setInformation({
          name: data.name,
          ownerLogin: data.owner.login,
          ownerAvatarUrl: data.owner.avatar_url,
          description: data.description,
          branches: branchesAmount,
          watchers_count: data.watchers_count,
          forks: data.forks,
          stargazers_count: data.stargazers_count,
        });
        setNoInfo(false);
      } catch (error) {
        setNoInfo(true);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [owner, name]);

  return (
    <div className={styles.container}>
      {isLoading && <Loader size={LoaderSize.l} />}
      {noInfo || !information ? (
        <div style={{ display: isLoading ? "none" : "block" }}>
          Репозитория нет, или он является приватным
        </div>
      ) : (
        <div className={styles.repoInfo}>
          <div className={styles.title}>{information.name}</div>
          <div className={styles.flexContainer}>
            <div className={styles.author}>
              <img
                src={information.ownerAvatarUrl}
                alt="Owner's avatar"
                width={80}
                height={80}
              />
              <div>{information.ownerLogin}</div>
            </div>
            <div className={styles.information}>
              <div> Description: {information.description}</div>
              <div>За репозиторием наблюдают: {information.watchers_count}</div>
              <div>Звезд у репозитория: {information.stargazers_count}</div>
              <div>Форков репозитория: {information.forks}</div>
              <div>Количество ветвей: {information.branches}</div>
            </div>
          </div>
        </div>
      )}
      <Button onClick={() => navigate("/")}>Назад</Button>
    </div>
  );
};
