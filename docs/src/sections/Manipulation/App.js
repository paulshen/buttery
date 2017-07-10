import React from 'react';

import { Layer, Rect } from '../../proto';

const MyFrames = [
  Rect(100, 140, 60, 60),
  Rect(100, 180, 80, 80),
  Rect(100, 220, 100, 100),
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
          properties={{ opacity: 1 - this.state.index * 0.2 }}
          style={{
            backgroundColor: '#1693A5',
          }}
        />
      </div>
    );
  }
}
