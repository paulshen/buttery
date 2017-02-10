/* @flow */

import Constraint from './Constraint';
import Motion from './Motion';
import createScroll from './motion/createScroll';
import createSpring from './motion/createSpring';
import Friction from './motion/Friction';

export default class Draggable {
  props: ?{
    momentum?: boolean,
    constraintX?: Constraint,
    constraintY?: Constraint,
    pageSize?: number,
  };
  layerProperties: LayerProperties;
  isDragging = false;

  _layer: HTMLElement;
  _p: Point;
  _dragStart: Point;
  _touches: Object[];
  _motion: Motion;
  _onDragStart: ?() => void;
  _layerUpdater: (p: Point) => void;
  _onDragEnd: ?(p: Point) => void;

  start(layer: HTMLElement, initialPoint: Point, onDragStart: ?() => void, updater: (p: Point) => void, onDragEnd: ?(p: Point) => void) {
    this._layer = layer;
    this._p = initialPoint;
    this._onDragStart = onDragStart;
    this._layerUpdater = updater;
    this._onDragEnd = onDragEnd;
    this._layer.addEventListener('touchstart', this._onTouchStart, false);
    this._layer.addEventListener('touchmove', this._onTouchMove, false);
    this._layer.addEventListener('touchend', this._onTouchEnd, false);
  }

  setPoint(p: Point) {
    this._p = p;
  }

  stop() {
    this.isDragging = false;
    if (this._motion) {
      this._motion.stop();
    }
    this._layer.removeEventListener('touchstart', this._onTouchStart);
    this._layer.removeEventListener('touchmove', this._onTouchMove);
    this._layer.removeEventListener('touchend', this._onTouchEnd);
  }

  _onTouchStart = (e: TouchEvent) => {
    if (this._motion) {
      this._motion.stop();
    }
    this.isDragging = true;
    this._dragStart = { ...this._p };
    this._touches = [];
    this._addTouch(e.touches[0]);
    this._onDragStart && this._onDragStart();
  };

  _onTouchMove = (e: TouchEvent) => {
    let touch = e.touches[0];
    let x = this._dragStart.x + (touch.clientX - this._touches[0].clientX);
    let y = this._dragStart.y + (touch.clientY - this._touches[0].clientY);
    this._p = {
      x: this.props && this.props.constraintX ? this.props.constraintX.point(x) : x,
      y: this.props && this.props.constraintY ? this.props.constraintY.point(y) : y,
    };
    this._updater(this._p);
    this._addTouch(touch);
  };

  _onTouchEnd = (e: TouchEvent) => {
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
      let pageSize = this.props && this.props.pageSize;
      let momentum = this.props && this.props.momentum;
      if (pageSize) {
        // $FlowAssert
        let targetX = Math.min(Math.max(Math.round(this._p.x / pageSize + Math.min(Math.max(v.x, -0.5), 0.5)), this.props.constraintX.min / pageSize), this.props.constraintX.max / pageSize) * pageSize;
        // TODO: y
        let springX = createSpring(targetX);
        this._motion = new Motion(function(p: Point, v: Vector, dt: number) {
          let [v_x, shouldStop_x] = springX(p.x, v.x, dt);
          return [{ x: v_x, y: 0 }, shouldStop_x];
        });
        this._motion.start(this._p, v, this._updater, this._onMotionEnd);
      } else if (momentum) {
        // $FlowAssert
        let props: Object = this.props;
        let scrollX = props.constraintX ? createScroll(props.constraintX) : Friction;
        let scrollY = props.constraintY ? createScroll(props.constraintY) : Friction;
        this._motion = new Motion(function(p: Point, v: Vector, dt: number) {
          let [v_x, shouldStop_x] = scrollX(p.x, v.x, dt);
          let [v_y, shouldStop_y] = scrollY(p.y, v.y, dt);
          return [{ x: v_x, y: v_y }, shouldStop_x && shouldStop_y];
        });
        this._motion.start(this._p, v, this._updater, this._onMotionEnd);
      } else {
        this.isDragging = false;
        this._onDragEnd && this._onDragEnd(this._p);
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
    this._p = p;
    this._layerUpdater(p);
  };

  _onMotionEnd = (p: Point) => {
    this.isDragging = false;
    this._onDragEnd && this._onDragEnd(p);
  };
}
