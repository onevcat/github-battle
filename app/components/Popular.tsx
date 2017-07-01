import * as React from 'react';

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

interface PopularState {
  seletectLanguage: string
}

export class Popular extends React.Component<undefined, PopularState> {
  constructor(props: undefined) {
    super(props);
    this.state = {
      seletectLanguage: 'All'
    };
  }

  updateLanguage = (lang: string) => {
    this.setState({
      seletectLanguage: lang
    });
  }

  render() {

    return (
      <div>
        <SelectLanguage
          seletectLanguage={this.state.seletectLanguage}
          onSelect={this.updateLanguage} />
      </div>
    )
  }
}