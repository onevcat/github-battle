import * as React from 'react';
import * as api from '../utils/API';
import { RouteComponentProps } from 'react-router';
import * as queryString from 'query-string';
import { Link } from "react-router-dom";
import { PlayerPreview } from './PlayerPreview';

interface ResultsState {
  winner: api.UserData
  loser: api.UserData
  error: string
  loading: boolean
}

interface PlayerProps {
  label: string
  score: number
  profile: api.User
}

function Player(props: PlayerProps) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
      <PlayerPreview username={props.profile.login} avatar={props.profile.avatar_url} />
    </div>
  )
}

export class Results extends React.Component<RouteComponentProps<{}>, ResultsState> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    let users = queryString.parse(this.props.location.search)
    console.log(users);
    let player1 = users.playerOneName;
    let player2 = users.playerTwoName;
    api.battle([player1, player2]).then(data => {
      if (data === null) {
        return this.setState({
          error: "Error!",
          loading: false
        });
      }
      this.setState({
        winner: data[0],
        loser: data[1],
        error: null,
        loading: false
      });
    })
  }

  render() {
    if (this.state.loading === true) {
      return (<div>Loading</div>)
    }
    if (this.state.error) {
      return (
        <div>
          {this.state.error}
          <Link to='/battle'>Reset</Link>
        </div>);
    }

    let winner = this.state.winner;
    let loser = this.state.loser;

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}