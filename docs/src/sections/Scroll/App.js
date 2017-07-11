import React from 'react';

import { DragConstraint, Layer, Frame } from '../../proto';

export default class Example extends React.Component {
  state = {
    y: 0,
  };

  _onDragEnd = ({ y }) => {
    this.setState({ y });
  };

  render() {
    return (
      <Layer frame={Frame(0, 0, 375, 667)} properties={{ overflow: 'hidden' }}>
        <Layer
          frame={Frame(0, this.state.y, 375, 2000)}
          draggable={true}
          draggableProperties={{
            constraintX: DragConstraint({ min: 0, max: 0 }),
            constraintY: DragConstraint({
              min: 667 - 2000,
              max: 0,
              bounce: true,
            }),
            momentum: true,
          }}
          onDragEnd={this._onDragEnd}
          properties={{
            backgroundImage:
              'linear-gradient(to bottom, #a8f3f7 0%, #1e5799 100%)',
          }}
        />
      </Layer>
    );
  }
}
