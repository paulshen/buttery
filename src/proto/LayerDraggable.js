/* @flow */
import React from 'react';

import Layer from './Layer';

export default class LayerDraggable extends React.Component {
  props: {
    height: number,
    width: number,
    initialX: number,
    initialY: number,
  };
  state: {
    x: number,
    y: number,
  };
  _dragStartTouch: Object;
  _dragStartX: number;
  _dragStartY: number;

  constructor(props: $PropertyType<LayerDraggable, 'props'>) {
    super();
    this.state = {
      x: props.initialX,
      y: props.initialY,
    };
  }

  _onTouchStart = (e: SyntheticTouchEvent) => {
    this._dragStartTouch = e.touches[0];
    this._dragStartX = this.state.x;
    this._dragStartY = this.state.y;
  };

  _onTouchMove = (e: SyntheticTouchEvent) => {
    let touch = e.touches[0];
    let x = this._dragStartX + (touch.clientX - this._dragStartTouch.clientX);
    let y = this._dragStartY + (touch.clientY - this._dragStartTouch.clientY);
    this.setState({ x, y });
  };

  _onTouchEnd = () => {
  };

  render() {
    let { initialX, initialY, ...props } = this.props;

    return (
      <Layer
        {...props}
        x={this.state.x}
        y={this.state.y}
        onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        onTouchEnd={this._onTouchEnd}
      />
    );
  }
}
