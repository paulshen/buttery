import React from 'react';

import { DragConstraint, Layer, Frame, Drag } from '../../proto';

function Row() {
  return (
    <div style={{
      display: 'flex',
      height: '84px',
      width: '100%',
    }}>
      <div style={{
        backgroundColor: '#49c6ae',
        borderRadius: '4px',
        flex: 1,
        margin: '16px 16px 0',
      }} />
    </div>
  );
}

export default class Example extends React.Component {
  state = {
    y: 0,
  };

  _onDragEnd = ({ y }) => {
    this.setState({ y });
  };

  render() {
    return (
      <Layer frame={Frame(0, 0, 400, 400)} style={{
        overflow: 'hidden',
      }}>
        <Layer
          frame={Frame(
            0,
            Drag(this.state.y, {
              min: 400 - (84 * 10 + 16),
              max: 0,
              bounce: true,
              momentum: true,
            }),
            400,
            84 * 10 + 16,
          )}
          onDragEnd={this._onDragEnd}>
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
        </Layer>
      </Layer>
    );
  }
}
