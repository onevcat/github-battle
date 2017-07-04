import * as React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component<any, any> {
  render() {
    return (
      <div className='home-container'>
        <h1>GitHub Battle: Battle your friends...and stuff.</h1>
        <Link className='button' to='/battle'>
          Battle
        </Link>
      </div>
    )
  }
}