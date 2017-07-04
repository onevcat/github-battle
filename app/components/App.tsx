import * as React from 'react';
import { Popular } from './Popular';
import { Home } from './Home';
import { Battle } from './Battle';
import { Nav } from './Nav';
import { Results } from './Results';

import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/popular' component={Popular} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route render={() => {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}