/* @flow */
import React from 'react';

import Constraint from './Constraint';
import Layer from './Layer';
import Motion from './Motion';
import createScroll from './motion/createScroll';
import createSpring from './motion/createSpring';

export default class LayerDraggable extends React.Component {
  props: {
    properties: LayerProperties,
    initialX: number,
    initialY: number,
    viewportSize?: { width: number, height: number },
    pageSize?: number,
  };
  state: {
    x: number,
    y: number,
  };
  _dragStart: Point;
  _touches: Object[];
  _constraintX: Constraint;
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
    if (this.props.viewportSize) {
      this._constraintX = new Constraint({
        min: -(this.props.properties.width - this.props.viewportSize.width),
        max: 0,
      });
    } else {
      this._constraintX = new Constraint({});
    }
  };

  _onTouchMove = (e: SyntheticTouchEvent) => {
    let touch = e.touches[0];
    let p = {
      x: this._constraintX.point(this._dragStart.x + (touch.clientX - this._touches[0].clientX)),
      y: this._dragStart.y, // + (touch.clientY - this._touches[0].clientY),
    };
    this.setState(p);
    this._addTouch(touch);
  };

  _onTouchEnd = (e: SyntheticTouchEvent) => {
    if (this._touches.length > 2) {
      let v = { x: 0, y: 0 };
      let lastTouch = this._touches[this._touches.length - 1];
      if (Date.now() - lastTouch.t < 50) {
        let secondToLastTouch = this._touches[this._touches.length - 2];
        v = {
          x: (lastTouch.clientX - secondToLastTouch.clientX) / (lastTouch.t - secondToLastTouch.t),
          y: (lastTouch.clientY - secondToLastTouch.clientY) / (lastTouch.t - secondToLastTouch.t),
        };
      }
      const { pageSize } = this.props;
      if (pageSize) {
        // $FlowAssert
        let targetX = Math.min(Math.max(Math.round(this.state.x / pageSize + Math.min(Math.max(v.x, -0.5), 0.5)), this._constraintX.min / pageSize), this._constraintX.max / pageSize) * pageSize;
        let springX = createSpring(targetX);
        this._motion = new Motion(function(p: Point, v: Vector, dt: number) {
          let [v_x, shouldStop_x] = springX(p.x, v.x, dt);
          return [{ x: v_x, y: 0 }, shouldStop_x];
        });
        this._motion.start({ x: this.state.x, y: this.state.y }, v, this._updater);
      } else {
        let scrollX = createScroll(this._constraintX);
        this._motion = new Motion(function(p: Point, v: Vector, dt: number) {
          let [v_x, shouldStop_x] = scrollX(p.x, v.x, dt);
          return [{ x: v_x, y: 0 }, shouldStop_x];
        });
        this._motion.start({ x: this.state.x, y: this.state.y }, v, this._updater);
      }
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
