import React from 'react';

import { DragConstraint, Layer, Rect } from '../../proto';

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
        frame={Rect(50, 200, 275, 80)}
        properties={{
          backgroundColor: '#c3f0f7',
        }}>
        <Layer
          frame={Rect(this.state.x, 0, 80, 80)}
          draggable={true}
          draggableProperties={{
            constraintX: DragConstraint({ min: 0, max: 275 - 80 }),
            constraintY: DragConstraint({ min: 0, max: 0 }),
          }}
          onDragEnd={this._onDragEnd}
          properties={{
            backgroundColor: '#1693A5',
          }}
        />
      </Layer>
    );
  }
}
