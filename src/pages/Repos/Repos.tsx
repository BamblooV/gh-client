import React, { useState, KeyboardEvent } from "react";

import { Card } from "@components/Card/Card";
import { Input } from "@components/Input";
import { Loader, LoaderSize } from "@components/Loader";
import { SearchButton } from "@components/SearchButton";
import { GithubRepoModel } from "@models//gitHub";
import { useQueryParamsStoreInit } from "@rootStore/hooks/useQueryParamsStoreInit";
import rootStore from "@rootStore/instance";
import { GitHubStore } from "@store/GitHubStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./Repos.module.scss";

const Repos: React.FC = () => {
  useQueryParamsStoreInit();
  const root = rootStore;
  const [, setSearch] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    root.query.getParam("org")?.toString() || ""
  );
  const store = useLocalStore(() => new GitHubStore());
  React.useEffect(() => {
    setSearch({ org: inputValue });
  }, [inputValue, setSearch]);

  const getInputOrganizationRepoList = React.useCallback(
    () => store.getOrganizationRepoList({ organizationName: inputValue }),
    [inputValue, store]
  );

  React.useEffect(() => {
    if (inputValue !== "") {
      getInputOrganizationRepoList();
    }
  }, []);

  const handleClick = () => {
    store.reset();
    getInputOrganizationRepoList();
  };

  const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      store.reset();
      getInputOrganizationRepoList();
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
        next={() => getInputOrganizationRepoList()}
        hasMore={store.hasMore}
        loader={
          store.isLoading && (
            <div className={styles.loaderContainer}>
              <Loader size={LoaderSize.l} />
            </div>
          )
        }
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
