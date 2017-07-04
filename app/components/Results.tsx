import * as React from 'react';
import * as api from '../utils/API';

export class Results extends React.Component<any, any> {

  componentDidMount() {
    api.battle(['yumigi', 'onevcat']).then(data => {
      console.log(data);
    })
  }

  render() {
    return (
      <div>
        Results
      </div>
    )
  }
}