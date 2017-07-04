import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export interface Repository {
  id: number
  name: string
  full_name: string
  owner: {
    avatar_url: string
    login: string
  }
  html_url: string
  private: boolean
  stargazers_count: number
}

export function fetchPopularRepos(language: string): Promise<Repository[]> {
  const encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositotries');
  return axios.get(encodedURI).then(res => {
    return res.data.items;
  });
}