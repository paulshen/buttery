import React from 'react';

import { Layer, Frame, Drag } from 'buttery';

export default class Example extends React.Component {
  state = {
    x: 160,
    y: 160,
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
        <div className="console">
          {this.state.lastEventMessage}
        </div>
        <Layer
          frame={Frame(Drag(this.state.x), Drag(this.state.y), 80, 80)}
          onMove={this._onMove}
          onDragEnd={this._onDragEnd}
          style={{
            backgroundColor: '#49c6ae',
          }}
        />
      </div>
    );
  }
}
