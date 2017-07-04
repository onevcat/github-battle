import * as React from 'react';
import { Link } from 'react-router-dom';

interface PlayerPreviewProps {
  username: string
  avatar: string
  id: string
  onReset: (id: string) => void
}

class PlayerPreview extends React.Component<PlayerPreviewProps, {}> {
  render() {
    return (
      <div>
        <div className='column'>
          <img className='avatar' src={this.props.avatar} />
          <h2 className='username'>@{this.props.username}</h2>
        </div>
        <button className='reset' onClick={e => this.props.onReset(this.props.id)}>
          Reset
        </button>
      </div>
    )
  }
}

interface PlayerInputProps {
  id: string
  label: string
  onSubmit: (id: string, name: string) => void
}

interface PlayerInputState {
  name: string
}

class PlayerInput extends React.Component<PlayerInputProps, PlayerInputState> {
  constructor(props: PlayerInputProps) {
    super(props);
    this.state = {
      name: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    let value = event.currentTarget.value;
    this.setState({
      name: value
    });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.name);
  }

  render() {
    return (
      <form className='column' onSubmit={e => this.handleSubmit(e)}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.name}
          onChange={e => this.handleChange(e)}
        />
        <button className='button' type='submit' disabled={!this.state.name}>Submit</button>
      </form>
    );
  }
}

interface BattleState {
  playerOneName: string
  playerTwoName: string
  playerOneImage: string
  playerTwoImage: string
}

export class Battle extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id: string, username: string) {
    this.setState(() => {
      let newState: Partial<BattleState> = {
        [id + 'Name']: username,
        [id + 'Image']: 'https://github.com/' + username + '.png?size=200'
      }

      return newState;
    });
  }

  handleReset(id: string) {
    this.setState(() => {
      let newState: Partial<BattleState> = {
        [id + 'Name']: '',
        [id + 'Image']: null
      };

      return newState;
    })
  }

  render() {

    let match = this.props.match;

    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;

    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className='row'>
          {playerOneName ?
            <PlayerPreview id='playerOne' username={playerOneName} avatar={playerOneImage} onReset={this.handleReset} /> :
            <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit} />}
          {playerTwoName ?
            <PlayerPreview id='playerTwo' username={playerTwoName} avatar={playerTwoImage} onReset={this.handleReset} /> :
            <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit} />}
        </div>
        {playerOneName && playerTwoName &&
          <Link className='button' to={{
            pathname: match.url + '/results',
            search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
          }}>Battle</Link>
        }
      </div>
    )
  }
}