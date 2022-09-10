export type GithubRepoApi = {
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

export type GithubRepoModel = {
  title: string;
  owner: {
    name: string;
    avatarUrl: string;
  };
  htmlLink: string;
  updated: Date;
  starCount: number;
  id: number;
};

export const normalizeGithubRepo = (from: GithubRepoApi): GithubRepoModel => ({
  title: from.name,
  owner: {
    name: from.owner.login,
    avatarUrl: from.owner.avatar_url,
  },
  htmlLink: from.owner.html_url,
  updated: new Date(from.updated_at),
  starCount: from.stargazers_count,
  id: from.id,
});
