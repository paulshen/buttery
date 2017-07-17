import React from 'react';

import { DragConstraint, Layer, Frame, Drag } from '../../proto';

export default class Example extends React.Component {
  state = {
    x: 100,
    y: 100,
  };

  _onDragEnd = ({ x, y }) => {
    this.setState({ x, y });
  };

  render() {
    return (
      <Layer
        frame={Frame(60, 60, 280, 280)}
        style={{
          backgroundColor: '#fcfefe',
        }}
      >
        <Layer
          frame={Frame(
            Drag(this.state.x, {
              min: 0,
              max: 280 - 80,
              bounce: true,
              momentum: true,
            }),
            Drag(this.state.y, {
              min: 0,
              max: 280 - 80,
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
