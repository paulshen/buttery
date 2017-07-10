import React from 'react';

import { DragConstraint, Layer, Rect } from '../../proto';

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
        frame={Rect(50, (667 - 275) / 2, 275, 275)}
        style={{
          backgroundColor: '#c3f0f7',
        }}>
        <Layer
          frame={Rect(this.state.x, this.state.y, 80, 80)}
          draggable={true}
          draggableProperties={{
            constraintX: DragConstraint({ min: 0, max: 275 - 80, bounce: true }),
            constraintY: DragConstraint({ min: 0, max: 275 - 80, bounce: true }),
            momentum: true,
          }}
          onDragEnd={this._onDragEnd}
          style={{
            backgroundColor: '#1693A5',
          }}
        />
      </Layer>
    );
  }
}
