/* @flow */
import React from 'react';

import Constraint from './Constraint';
import Layer from './Layer';
import Motion from './Motion';
import createScroll from './motion/createScroll';

export default class LayerDraggable extends React.Component {
  props: {
    properties: LayerProperties,
    initialX: number,
    initialY: number,
  };
  state: {
    x: number,
    y: number,
  };
  _dragStart: Point;
  _touches: Object[];
  _constraint: Constraint;
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
    this._dragStart = { x: this.state.x, y: this.state.y };
    this._touches = [];
    this._addTouch(e.touches[0]);
    this._constraint = new Constraint({
      minX: 0,
      maxX: 375 - this.props.properties.width,
      minY: 0,
      maxY: 667 - this.props.properties.height,
    });
  };

  _onTouchMove = (e: SyntheticTouchEvent) => {
    let touch = e.touches[0];
    let p = this._constraint.point({
      x: this._dragStart.x + (touch.clientX - this._touches[0].clientX),
      y: this._dragStart.y + (touch.clientY - this._touches[0].clientY),
    });
    this.setState(p);
    this._addTouch(touch);
  };

  _onTouchEnd = (e: SyntheticTouchEvent) => {
    if (this._touches.length > 2) {
      let lastTouch = this._touches[this._touches.length - 1];
      let secondToLastTouch = this._touches[this._touches.length - 2];
      let v = {
        x: (lastTouch.clientX - secondToLastTouch.clientX) / (lastTouch.t - secondToLastTouch.t),
        y: (lastTouch.clientY - secondToLastTouch.clientY) / (lastTouch.t - secondToLastTouch.t),
      };
      this._motion = new Motion(createScroll(this._constraint));
      this._motion.start({ x: this.state.x, y: this.state.y }, v, this._updater);
    }
  };

  _addTouch = (touch: any) => {
    this._touches.push({
      clientX: touch.clientX,
      clientY: touch.clientY,
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
    let { initialX, initialY, properties, ...props } = this.props;

    return (
      <Layer
        {...props}
        properties={{
          ...properties,
          x: this.state.x,
          y: this.state.y,
        }}
        onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        onTouchEnd={this._onTouchEnd}
      />
    );
  }
}
