/* eslint-disable no-console */
import React, { useState, KeyboardEvent } from "react";

import { Card } from "@components/Card/Card";
import { Input } from "@components/Input";
import { SearchButton } from "@components/SearchButton";
import { API_ENDPOINTS } from "@config/api";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./Repos.module.scss";

type GIT_RESPONSE = {
  owner: {
    avatar_url: string;
    login: string;
    html_url: string;
  };
  name: string;
  updated_at: string;
  stargazers_count: number;
  id: number;
};

type REPOSITORY_INFO = {
  image: string;
  title: string;
  owner: string;
  htmlLink: string;
  updated: string;
  starCount: number;
  id: number;
};

export const Repos = () => {
  const [inputValue, setInputValue] = useState("");
  const [repos, setRepos] = useState([] as REPOSITORY_INFO[]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(1);

  const fetchData = async () => {
    const data = (
      await axios.get(
        API_ENDPOINTS.REPOS + `${inputValue}/repos?page=` + nextPage
      )
    ).data;

    const preprocessedData = data.map((rep: GIT_RESPONSE) => ({
      image: rep.owner.avatar_url,
      title: rep.name,
      owner: rep.owner.login,
      htmlLink: rep.owner.html_url,
      updated: rep.updated_at,
      starCount: rep.stargazers_count,
      id: rep.id,
    }));

    setRepos((prevState: REPOSITORY_INFO[]) => {
      return [...prevState, ...preprocessedData];
    });
    setNextPage((prevState) => prevState + 1);

    if (preprocessedData.length < 30) {
      setHasMore(false);
    }
  };

  const handleClick = () => {
    setHasMore(true);
    setNextPage(1);
    setRepos([] as REPOSITORY_INFO[]);
    fetchData();
  };

  const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log(event);
    if (event.code === "Enter") {
      setHasMore(true);
      setNextPage(1);
      setRepos([] as REPOSITORY_INFO[]);
      fetchData();
    }
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.inputContainer}>
        <Input
          placeholder="Введите название организации"
          value={inputValue}
          onChange={setInputValue}
          onKeyPress={keyPressHandler}
        />
        <SearchButton onClick={handleClick} />
      </div>
      <InfiniteScroll
        style={{ fontSize: "40px" }}
        className={styles.rowItem}
        dataLength={repos.length}
        next={fetchData}
        hasMore={hasMore}
        loader={""}
        endMessage={
          <p className={styles.ending}>
            <b>Ты посмотрел все репозитории</b>
          </p>
        }
      >
        {repos.map((rep: REPOSITORY_INFO) => (
          <Card
            key={rep.id}
            image={rep.image}
            title={rep.title}
            owner={rep.owner}
            htmlLink={rep.htmlLink}
            updated={rep.updated}
            starCount={rep.starCount}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};
