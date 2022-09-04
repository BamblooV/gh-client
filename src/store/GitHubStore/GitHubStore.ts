import { API_ENDPOINTS } from "@config/api";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";

import { GithubRepoModel, normalizeGithubRepo } from "../../models/gitHub";
// import { GithubRepoModel, normalizeGithubRepo } from "@models/gitHub";
export type GetOrganizationRepoListParams = {
  organizationName: string;
};

interface IGitHubStore {
  getOrganizationRepoList(params: GetOrganizationRepoListParams): Promise<void>;
}

type PrivateFields = "_list" | "_hasMore";

export class GitHubStore implements ILocalStore, IGitHubStore {
  private _list: GithubRepoModel[] = [];
  private _hasMore: boolean = true;
  private _nextPage: number = 1;
  private readonly _responseLength: number = 30;

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _hasMore: observable,
      list: computed,
      hasMore: computed,
      getOrganizationRepoList: action,
      reset: action,
    });
  }

  get list(): GithubRepoModel[] {
    return this._list;
  }

  get hasMore(): boolean {
    return this._hasMore;
  }

  reset(): void {
    this._hasMore = true;
    this._nextPage = 1;
    this._list = [];
  }

  async getOrganizationRepoList(
    params: GetOrganizationRepoListParams
  ): Promise<void> {
    const response = await axios.get(
      API_ENDPOINTS.ORGS +
        `${params.organizationName}/repos?page=` +
        this._nextPage
    );
    runInAction(() => {
      try {
        const data = response.data.map(normalizeGithubRepo);
        this._list = [...this._list, ...data];
        this._nextPage = this._nextPage + 1;

        if (data.length < this._responseLength) {
          this._hasMore = false;
        }
      } catch (error) {
        throw error;
      }
    });
  }
  destroy(): void {}
}
