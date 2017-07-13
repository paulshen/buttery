import React from 'react';

import { DragConstraint, Layer, Frame, Drag } from '../../proto';

export default class Example extends React.Component {
  state = {
    y: 0,
  };

  _onDragEnd = ({ y }) => {
    this.setState({ y });
  };

  render() {
    return (
      <Layer frame={Frame(0, 0, 375, 667)} style={{ overflow: 'hidden' }}>
        <Layer
          frame={Frame(
            0,
            Drag(this.state.y, {
              min: 667 - 2000,
              max: 0,
              bounce: true,
              momentum: true,
            }),
            375,
            2000
          )}
          onDragEnd={this._onDragEnd}
          style={{
            backgroundImage:
              'linear-gradient(to bottom, #a8f3f7 0%, #1e5799 100%)',
          }}
        />
      </Layer>
    );
  }
}
