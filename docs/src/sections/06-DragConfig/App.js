import React from 'react';

import { Layer, Frame, Drag } from '../../proto';

export default class Example extends React.Component {
  state = {
    x: 80,
  };

  _onDragEnd = ({ x }) => {
    this.setState({ x });
  };

  render() {
    return (
      <Layer
        frame={Frame(40, 120, 240, 80)}
        style={{
          backgroundColor: '#def5f0',
        }}
      >
        <Layer
          frame={Frame(
            Drag(this.state.x, { min: 0, max: 240 - 80 }),
            0,
            80,
            80
          )}
          onDragEnd={this._onDragEnd}
          style={{
            backgroundColor: '#49c6ae',
          }}
        />
      </Layer>
    );
  }
}
