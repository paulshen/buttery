import React from 'react';

import { Layer } from '../../proto';

export default class Example extends React.Component {
  state = {
    x: 100,
    y: 140,
    lastEventMessage: '',
  };

  _onMove = ({ x, y }) => {
    this.setState({
      lastEventMessage: `onMove: (${x}, ${y})`,
    });
  };

  _onDragEnd = ({ x, y }) => {
    this.setState({
      x, y,
      lastEventMessage: `onDragEnd: (${x}, ${y})`,
    });
  };

  render() {
    return (
      <div>
        <div style={{ position: 'absolute' }}>
          {this.state.lastEventMessage}
        </div>
        <Layer
          properties={{
            x: this.state.x,
            y: this.state.y,
            width: 80,
            height: 80,
            backgroundColor: '#1693A5',
          }}
          draggable={true}
          onMove={this._onMove}
          onDragEnd={this._onDragEnd}
        />
      </div>
    );
  }
}
