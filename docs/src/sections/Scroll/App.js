import React from 'react';

import { DragConstraint, Layer, Rect } from '../../proto';

export default class Example extends React.Component {
  state = {
    y: 0,
  };

  _onDragEnd = ({ y }) => {
    this.setState({ y });
  };

  render() {
    return (
      <Layer frame={Rect(0, 0, 375, 667)} style={{ overflow: 'hidden' }}>
        <Layer
          frame={Rect(0, this.state.y, 375, 2000)}
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
          style={{
            backgroundImage:
              'linear-gradient(to bottom, #a8f3f7 0%, #1e5799 100%)',
          }}
        />
      </Layer>
    );
  }
}
