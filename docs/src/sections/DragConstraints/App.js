import React from 'react';

import { DragConstraint, Layer } from '../../proto';

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
        properties={{
          x: 50,
          y: 200,
          width: 275,
          height: 80,
          backgroundColor: '#c3f0f7',
        }}>
        <Layer
          properties={{
            x: this.state.x,
            y: 0,
            width: 80,
            height: 80,
            backgroundColor: '#1693A5',
          }}
          draggable={true}
          draggableProperties={{
            constraintX: DragConstraint({ min: 0, max: 275 - 80 }),
            constraintY: DragConstraint({ min: 0, max: 0 }),
          }}
          onDragEnd={this._onDragEnd}
        />
      </Layer>
    );
  }
}
