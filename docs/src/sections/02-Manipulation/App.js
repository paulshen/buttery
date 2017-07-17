import React from 'react';

import { Layer, Frame } from '../../proto';

const MyFrames = [
  Frame(120, 120, 80, 80),
  Frame(110, 110, 100, 100),
  Frame(100, 100, 120, 120),
];

export default class Example extends React.Component {
  state = {
    index: 0,
  };

  _onClick = () => {
    this.setState({
      index: (this.state.index + 1) % MyFrames.length,
    });
  };

  render() {
    return (
      <div>
        <div style={{ position: 'absolute' }}>
          <button onClick={this._onClick}>Toggle</button>
        </div>
        <Layer
          frame={MyFrames[this.state.index]}
          style={{
            backgroundColor: '#49c6ae',
            borderRadius: this.state.index * 30,
          }}
        />
      </div>
    );
  }
}
