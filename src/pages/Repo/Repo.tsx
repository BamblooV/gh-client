import { useEffect } from "react";

import { Button } from "@components/Button";
import { Loader, LoaderSize } from "@components/Loader";
import { RepoStore } from "@store/RepoStore";
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
    if (owner && name) {
      store.getRepoInformation({ owner, name });
    }
  }, [name, owner, store]);

  return (
    <div className={styles.container}>
      {store.isLoading && <Loader size={LoaderSize.l} />}
      {store.noInfo || !store.information ? (
        <div style={{ display: store.isLoading ? "none" : "block" }}>
          Репозитория нет, или он является приватным
        </div>
      ) : (
        <RepoCard information={store.information} />
      )}
      <Button onClick={() => navigate(-1)}>Назад</Button>
    </div>
  );
};

export default observer(Repo);
