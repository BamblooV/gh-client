import React, { useState, KeyboardEvent } from "react";

import { Card } from "@components/Card/Card";
import { Input } from "@components/Input";
import { SearchButton } from "@components/SearchButton";
import { GithubRepoModel } from "@models//gitHub";
import { GitHubStore } from "@store/GitHubStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useSearchParams } from "react-router-dom";

import rootStore from "../../RootStore//instance";
import { useQueryParamsStoreInit } from "../../RootStore/hooks/useQueryParamsStoreInit";
import styles from "./Repos.module.scss";

const Repos: React.FC = () => {
  useQueryParamsStoreInit();
  const root = rootStore;
  const [search, setSearch] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    root.query.getParam("org")?.toString() || ""
  );
  const store = useLocalStore(() => new GitHubStore());
  React.useEffect(() => {
    setSearch({ org: inputValue });
  }, [inputValue, setSearch]);

  React.useEffect(() => {
    if (inputValue !== "") {
      store.getOrganizationRepoList({ organizationName: inputValue });
    }
  }, []);

  const handleClick = () => {
    store.reset();
    store.getOrganizationRepoList({ organizationName: inputValue });
  };

  const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      store.reset();
      store.getOrganizationRepoList({ organizationName: inputValue });
    }
  };

  const onChangeHandler = (value: string): void => {
    setInputValue(value);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.gridContainer}>
      <div className={styles.inputContainer}>
        <Input
          placeholder="Введите название организации"
          value={inputValue}
          onChange={onChangeHandler}
          onKeyPress={keyPressHandler}
        />
        <SearchButton onClick={handleClick} />
      </div>
      <InfiniteScroll
        style={{ fontSize: "40px" }}
        className={styles.rowItem}
        dataLength={store.list.length}
        next={() =>
          store.getOrganizationRepoList({ organizationName: inputValue })
        }
        hasMore={store.hasMore}
        loader={""}
        endMessage={
          <p className={styles.ending}>
            <b>Ты посмотрел все репозитории</b>
          </p>
        }
      >
        {store.list.map((rep: GithubRepoModel) => (
          <Card
            key={rep.id}
            image={rep.owner.avatarUrl}
            title={rep.title}
            owner={rep.owner.name}
            htmlLink={rep.htmlLink}
            updated={rep.updated}
            starCount={rep.starCount}
            onClick={() => navigate(`/repo/${rep.owner.name}/${rep.title}`)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default observer(Repos);
