export type GithubRepositoryApi = {
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

export type GithubRepositoryModel = {
  name: string;
  owner: {
    name: string;
    avatarUrl: string;
  };
  description: string;
  branches?: number;
  watchersCount: number;
  forks: number;
  stargazersCount: number;
};

export const normalizeGithubRepository = (
  from: GithubRepositoryApi
): GithubRepositoryModel => ({
  name: from.name,
  owner: {
    name: from.owner.login,
    avatarUrl: from.owner.avatar_url,
  },
  description: from.description,
  watchersCount: from.watchers_count,
  forks: from.forks,
  stargazersCount: from.stargazers_count,
});
