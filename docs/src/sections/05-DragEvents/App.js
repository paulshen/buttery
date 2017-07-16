import React from 'react';

import { Layer, Frame, Drag } from '../../proto';

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
          frame={Frame(Drag(this.state.x), Drag(this.state.y), 80, 80)}
          onMove={this._onMove}
          onDragEnd={this._onDragEnd}
          style={{
            backgroundColor: '#1693A5',
          }}
        />
      </div>
    );
  }
}
