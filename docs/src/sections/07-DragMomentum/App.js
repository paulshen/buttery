import React from 'react';

import { DragConstraint, Layer, Frame, Drag } from '../../proto';

export default class Example extends React.Component {
  state = {
    x: 80,
    y: 80,
  };

  _onDragEnd = ({ x, y }) => {
    this.setState({ x, y });
  };

  render() {
    return (
      <Layer
        frame={Frame(40, 40, 240, 240)}
        style={{
          backgroundColor: '#def5f0',
        }}
      >
        <Layer
          frame={Frame(
            Drag(this.state.x, {
              min: 0,
              max: 240 - 80,
              bounce: true,
              momentum: true,
            }),
            Drag(this.state.y, {
              min: 0,
              max: 240 - 80,
              bounce: true,
              momentum: true,
            }),
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
