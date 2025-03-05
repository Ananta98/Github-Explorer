type User = {
  id: number;
  login: string;
  avatar_url: string;
};

type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  visibility: string;
  stargazers_count: number;
  language: string;
  fork: string;
  parent: string;
  updated_at: string;
};

type UserSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
};

export type { User, Repository, UserSearchResponse };
