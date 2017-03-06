import React from 'react';

import { Layer } from '../../proto';

const MyProperties = [
  { x: 375 / 2 - 40, y: 140, width: 80, height: 80, backgroundColor: '#1693A5', opacity: 1 },
  { x: 375 / 2 - 50, y: 200, width: 100, height: 100, backgroundColor: '#1693A5', opacity: 0.8 },
  { x: 375 / 2 - 20, y: 320, width: 40, height: 40, backgroundColor: '#1693A5', opacity: 0.6 },
];

export default class Example extends React.Component {
  state =  {
    index: 0,
  };

  _onClick = () => {
    this.setState({
      index: (this.state.index + 1) % MyProperties.length,
    });
  };

  render() {
    return (
      <div>
        <button onClick={this._onClick}>Toggle</button>
        <Layer properties={MyProperties[this.state.index]} />
      </div>
    );
  }
}
