import { API_ENDPOINTS } from "@config/api";
import { GithubRepoModel, normalizeGithubRepo } from "@models/gitHub";
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
  organizationName: string;
};

interface IGitHubStore {
  getOrganizationRepoList(params: GetOrganizationRepoListParams): Promise<void>;
}

type PrivateFields = "_list" | "_hasMore" | "_isLoading";

export class GitHubStore implements ILocalStore, IGitHubStore {
  private _list: GithubRepoModel[] = [];
  private _hasMore: boolean = true;
  private _nextPage: number = 1;
  private _isLoading: boolean = false;
  private readonly _responseLength: number = 30;

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _hasMore: observable,
      _isLoading: observable,
      list: computed,
      hasMore: computed,
      isLoading: computed,
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

  get isLoading(): boolean {
    return this._isLoading;
  }

  reset(): void {
    this._hasMore = true;
    this._nextPage = 1;
    this._isLoading = false;
    this._list = [];
  }

  async getOrganizationRepoList(
    params: GetOrganizationRepoListParams
  ): Promise<void> {
    this._isLoading = true;
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
      } finally {
        this._isLoading = false;
      }
    });
  }
  destroy(): void {}
}
