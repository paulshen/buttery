import React from 'react';

import { Layer, Frame, Drag } from '../../proto';

export default class Example extends React.Component {
  state = {
    x: 100,
  };

  _onDragEnd = ({ x }) => {
    this.setState({ x });
  };

  render() {
    return (
      <Layer
        frame={Frame(60, 160, 280, 80)}
        style={{
          backgroundColor: '#fcfefe',
        }}
      >
        <Layer
          frame={Frame(
            Drag(this.state.x, { min: 0, max: 280 - 80 }),
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
