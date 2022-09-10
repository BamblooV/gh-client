import { API_ENDPOINTS } from "@config/api";
import {
  GithubRepositoryApi,
  GithubRepositoryModel,
  normalizeGithubRepository,
} from "@models/gitHub";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";

export type GetOrganizationRepoListParams = {
  owner: string;
  name: string;
};

interface IGitHubStore {
  getRepoInformation(params: GetOrganizationRepoListParams): Promise<void>;
}

type PrivateFields = "_information" | "_noInfo" | "_isLoading";

export class RepoStore implements ILocalStore, IGitHubStore {
  private _information: GithubRepositoryModel | null = null;
  private _noInfo: boolean = true;
  private _isLoading: boolean = false;
  constructor() {
    makeObservable<RepoStore, PrivateFields>(this, {
      _information: observable.ref,
      _noInfo: observable,
      _isLoading: observable,
      information: computed,
      noInfo: computed,
      isLoading: computed,
      getRepoInformation: action.bound,
    });
  }

  get information(): GithubRepositoryModel | null {
    return this._information;
  }

  get noInfo(): boolean {
    return this._noInfo;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  async getRepoInformation(
    params: GetOrganizationRepoListParams
  ): Promise<void> {
    this._isLoading = true;
    try {
      const response = await axios.get(
        API_ENDPOINTS.REPOS + `/${params.owner}/${params.name}`
      );

      const data: GithubRepositoryApi = response.data;

      const branchesAmount = (
        await axios.get(
          API_ENDPOINTS.REPOS + `/${params.owner}/${params.name}/branches`
        )
      ).data.length;

      runInAction(() => {
        this._information = normalizeGithubRepository(data);
        this._information.branches = branchesAmount;
        this._noInfo = false;
      });
    } catch (error) {
      this._noInfo = true;
      return;
    } finally {
      this._isLoading = false;
    }
  }

  destroy(): void {}
}
