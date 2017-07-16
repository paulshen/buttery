import React from 'react';

import { Layer, Frame, Drag } from '../../proto';

export default class Example extends React.Component {
  state = {
    x: 0,
  };

  _onDragEnd = ({ x }) => {
    this.setState({ x });
  };

  render() {
    return (
      <Layer
        frame={Frame(50, 200, 275, 80)}
        style={{
          backgroundColor: '#c3f0f7',
        }}
      >
        <Layer
          frame={Frame(
            Drag(this.state.x, { min: 0, max: 275 - 80 }),
            0,
            80,
            80
          )}
          onDragEnd={this._onDragEnd}
          style={{
            backgroundColor: '#1693A5',
          }}
        />
      </Layer>
    );
  }
}
