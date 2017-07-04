import * as React from 'react';
import * as api from '../utils/API';

interface SelectLanguageProps {
  seletectLanguage: string,
  onSelect: (lang: string) => void;
}

class SelectLanguage extends React.Component<SelectLanguageProps, undefined> {
  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Swift', 'CSS', 'Python'];
    return (
      <ul className='languages'>
        {languages.map(l => {
          return (
            <li
              style={l === this.props.seletectLanguage ? { color: '#d0021b' } : null}
              onClick={this.props.onSelect.bind(null, l)}
              key={l}>
              {l}
            </li>
          )
        })}
      </ul>
    )
  };
}

interface RepoGridProps {
  repos: api.Repository[]
}

class RepoGrid extends React.Component<RepoGridProps, undefined> {
  render() {
    return (
      <ul className='popular-list'>
        {this.props.repos.map((repo, index) => {
          return (
            <li key={repo.name} className='popular-item'>
              <div className='popular-rank'>#{index + 1}</div>
              <ul className='space-list-items'>
                <li>
                  <img
                    className='avatar'
                    src={repo.owner.avatar_url}
                  />
                </li>
                <li><a href={repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }
}

interface PopularState {
  seletectLanguage: string
  repos: api.Repository[]
}

export class Popular extends React.Component<any, PopularState> {
  constructor(props: undefined) {
    super(props);
    this.state = {
      seletectLanguage: 'All',
      repos: null
    };
  }

  componentDidMount() {
    this.updateLanguage(this.state.seletectLanguage);
  }

  updateLanguage = (lang: string) => {
    this.setState({
      seletectLanguage: lang,
      repos: null
    });

    api.fetchPopularRepos(lang).then(repos => {
      this.setState({
        repos: repos
      });
    });
  }

  render() {
    return (
      <div>
        <SelectLanguage
          seletectLanguage={this.state.seletectLanguage}
          onSelect={this.updateLanguage} />
        {!this.state.repos ? <p>Loading</p> : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}