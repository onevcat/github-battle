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

interface User {
  followers: number
}

function getProfile(username: string): Promise<User> {
  return axios.get('https://api.github.com/users/' + username)
    .then(res => {
      return res.data;
    })
}

function getRepos(username: string): Promise<Repository[]> {
  return axios.get('https://api.github.com/users/' + username + '/repos?per_page=100')
    .then(res => {
      return res.data;
    });
}

function getStarCount(repos: Repository[]) {
  return repos.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile: User, repos: Repository[]) {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error: Error): null {
  console.warn(error);
  return null;
}

interface UserData {
  profile: User
  score: number
}

function getUserData(player: string): Promise<UserData> {
  let promises: [Promise<User>, Promise<Repository[]>] = [getProfile(player),
  getRepos(player)];
  return axios.all<User | Repository[]>(promises).then((data) => {
    let user = data[0] as User;
    let repos = data[1] as Repository[];
    return {
      profile: user,
      score: calculateScore(user, repos)
    };
  });
}

function sortPlayers(users: UserData[]): UserData[] {
  return users.sort((p1, p2) => {
    return p2.score - p1.score;
  });
}

export function fetchPopularRepos(language: string): Promise<Repository[]> {
  const encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositotries');
  return axios.get(encodedURI).then(res => {
    return res.data.items;
  });
}

export function battle(players: string[]): Promise<UserData[]> {
  return axios.all(players.map(getUserData)).then(sortPlayers).catch(handleError);
}