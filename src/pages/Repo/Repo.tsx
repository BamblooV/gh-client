import { useEffect } from "react";

import { Button } from "@components/Button";
import { Loader, LoaderSize } from "@components/Loader";
import { RepoStore } from "@store/RepoStore/RepoStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

import { RepoCard } from "./components";
import styles from "./Repo.module.scss";

const Repo = () => {
  const { owner, name } = useParams();
  const store = useLocalStore(() => new RepoStore());

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof owner === "string" && typeof name === "string") {
      store.getRepoInformation({ owner: owner, name: name });
    }
  }, []);

  return (
    <div className={styles.container}>
      {store.isLoading && <Loader size={LoaderSize.l} />}
      {store.noInfo || !store.information ? (
        <div style={{ display: store.isLoading ? "none" : "block" }}>
          Репозитория нет, или он является приватным
        </div>
      ) : (
        <RepoCard
          title={store.information.name}
          avatarUrl={store.information.owner.avatarUrl}
          ownerName={store.information.owner.name}
          description={store.information.description}
          watchersCount={store.information.watchersCount}
          stargazersCount={store.information.stargazersCount}
          forksCount={store.information.forks}
          branchesCount={store.information.branches}
        />
      )}
      <Button onClick={() => navigate(-1)}>Назад</Button>
    </div>
  );
};

export default observer(Repo);
