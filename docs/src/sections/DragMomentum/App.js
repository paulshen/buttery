import React from 'react';

import { DragConstraint, Layer } from '../../proto';

export default class Example extends React.Component {
  state = {
    x: 0,
    y: 0,
  };

  _onDragEnd = ({ x, y }) => {
    this.setState({ x, y });
  };

  render() {
    return (
      <Layer
        properties={{
          x: 50,
          y: (667 - 275) / 2,
          width: 275,
          height: 275,
          backgroundColor: '#c3f0f7',
        }}>
        <Layer
          properties={{
            x: this.state.x,
            y: this.state.y,
            width: 80,
            height: 80,
            backgroundColor: '#1693A5',
          }}
          draggable={true}
          draggableProperties={{
            constraintX: DragConstraint({ min: 0, max: 275 - 80, bounce: true }),
            constraintY: DragConstraint({ min: 0, max: 275 - 80, bounce: true }),
            momentum: true,
          }}
          onDragEnd={this._onDragEnd}
        />
      </Layer>
    );
  }
}
