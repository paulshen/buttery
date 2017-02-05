/* @flow */
import React from 'react';

import Layer from './Layer';
import Motion from './Motion';

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
  _touches: Object[];
  _motion: Motion;

  constructor(props: $PropertyType<LayerDraggable, 'props'>) {
    super();
    this.state = {
      x: props.initialX,
      y: props.initialY,
    };
  }

  _onTouchStart = (e: SyntheticTouchEvent) => {
    if (this._motion) {
      this._motion.stop();
    }
    this._dragStartTouch = e.touches[0];
    this._dragStartX = this.state.x;
    this._dragStartY = this.state.y;
    this._touches = [];
    this._addTouch(this._dragStartTouch);
  };

  _onTouchMove = (e: SyntheticTouchEvent) => {
    let touch = e.touches[0];
    let x = this._dragStartX + (touch.clientX - this._dragStartTouch.clientX);
    let y = this._dragStartY + (touch.clientY - this._dragStartTouch.clientY);
    this.setState({ x, y });
    this._addTouch(touch);
  };

  _onTouchEnd = (e: SyntheticTouchEvent) => {
    if (this._touches.length > 2) {
      let lastTouch = this._touches[this._touches.length - 1];
      let secondToLastTouch = this._touches[this._touches.length - 2];
      let v = {
        x: (lastTouch.x - secondToLastTouch.x) / (lastTouch.t - secondToLastTouch.t),
        y: (lastTouch.y - secondToLastTouch.y) / (lastTouch.t - secondToLastTouch.t),
      };
      this._motion = new Motion(this._friction, this._updater);
      this._motion.start(this.state, v);
    }
  };

  _friction = (p: Point, v: Vector, dt: number) => {
    return {
      x: Math.max(v.x - 0.001 * dt, 0),
      y: Math.max(v.y - 0.001 * dt, 0),
    };
  };

  _addTouch = (touch: any) => {
    this._touches.push({
      x: touch.clientX,
      y: touch.clientY,
      t: Date.now(),
    });
  };

  _updater = (p: Point) => {
    this.setState({
      x: p.x,
      y: p.y,
    });
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
