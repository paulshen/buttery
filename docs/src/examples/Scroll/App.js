import React from 'react';

import { DragConstraint, Layer } from '../../proto';

export default class Example extends React.Component {
  state = {
    y: 0,
  };

  _onDragEnd = ({ y }) => {
    this.setState({ y });
  };

  render() {
    return (
      <Layer
        properties={{ x: 0, y: 0, width: 375, height: 667 }}
        style={{ overflow: 'hidden' }}>
        <Layer
          properties={{
            x: 0,
            y: this.state.y,
            width: 375,
            height: 2000,
          }}
          draggable={true}
          draggableProperties={{
            constraintX: DragConstraint({ min: 0, max: 0 }),
            constraintY: DragConstraint({ min: 667 - 2000, max: 0, bounce: true }),
            momentum: true,
          }}
          onDragEnd={this._onDragEnd}
          style={{ backgroundImage: 'linear-gradient(to bottom, #a8f3f7 0%, #1e5799 100%)' }}
        />
      </Layer>
    );
  }
}
