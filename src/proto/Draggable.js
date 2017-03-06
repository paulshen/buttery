/* @flow */

import DragConstraint from './DragConstraint';
import Motion from './Motion';
import createScroll from './motion/createScroll';
import createSpring from './motion/createSpring';
import Friction from './motion/Friction';

export default class Draggable {
  props: ?{
    momentum?: boolean,
    constraintX?: DragConstraint,
    constraintY?: DragConstraint,
    pageSize?: number,
    onTouchEnd?: (p: Point) => void,
  };
  layerProperties: LayerProperties;
  isControlledByDraggable = false;

  _layer: HTMLElement;
  _p: Point;
  _dragStart: ?Point;
  _touches: Object[];
  _motion: Motion;
  _onDragStart: ?() => void;
  _layerUpdater: (p: Point) => void;
  /* callback on end of drag animation */
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
    this._layer.addEventListener('mousedown', this._onTouchStart, false);
    this._layer.addEventListener('mousemove', this._onTouchMove, false);
    this._layer.addEventListener('mouseup', this._onTouchEnd, false);
  }

  setPoint(p: Point) {
    this._p = p;
  }

  stop() {
    this.isControlledByDraggable = false;
    if (this._motion) {
      this._motion.stop();
    }
    this._layer.removeEventListener('touchstart', this._onTouchStart);
    this._layer.removeEventListener('touchmove', this._onTouchMove);
    this._layer.removeEventListener('touchend', this._onTouchEnd);
    this._layer.removeEventListener('mousedown', this._onTouchStart);
    this._layer.removeEventListener('mousemove', this._onTouchMove);
    this._layer.removeEventListener('mouseup', this._onTouchEnd);
  }

  _onTouchStart = (e: Event) => {
    if (this._motion) {
      this._motion.stop();
    }
    this.isControlledByDraggable = true;
    this._dragStart = { ...this._p };
    this._touches = [];
    this._addTouch(this._getTouch(e));
    if (this._onDragStart) {
      this._onDragStart();
    }
    e.stopPropagation();
  };

  _onTouchMove = (e: Event) => {
    const dragStart = this._dragStart;
    if (!dragStart) {
      return;
    }
    let touch = this._getTouch(e);
    let x = dragStart.x + (touch.clientX - this._touches[0].clientX);
    let y = dragStart.y + (touch.clientY - this._touches[0].clientY);
    this._p = {
      x: this.props && this.props.constraintX ? this.props.constraintX.point(x) : x,
      y: this.props && this.props.constraintY ? this.props.constraintY.point(y) : y,
    };
    this._updater(this._p);
    this._addTouch(touch);
  };

  _onTouchEnd = () => {
    if (!this._dragStart) {
      return;
    }
    if (this._touches.length > 2) {
      this.props && this.props.onTouchEnd && this.props.onTouchEnd(this._p);
      // splitting this allows clients to modify props on touchend
      window.requestAnimationFrame(this._onTouchEndMotion);
    }
    this._dragStart = null;
  };

  _getTouch = (e: Event) => {
    if (e.type.indexOf('mouse') !== -1) {
      // $FlowAssert
      let mouseEvent: MouseEvent = e;
      return { clientX: mouseEvent.clientX, clientY: mouseEvent.clientY };
    }
    // $FlowAssert
    let touchEvent: TouchEvent = e;
    return touchEvent.touches[0];
  };

  _onTouchEndMotion = () => {
    const props = this.props;
    let pageSize = props && props.pageSize;
    let momentum = props && props.momentum;
    if (props && (pageSize || momentum)) {
      let v = { x: 0, y: 0 };
      let lastTouch = this._touches[this._touches.length - 1];
      if (Date.now() - lastTouch.t < 50) {
        let secondToLastTouch = this._touches[this._touches.length - 2];
        let dt = lastTouch.t - secondToLastTouch.t;
        v = {
          x: (lastTouch.clientX - secondToLastTouch.clientX) / dt,
          y: (lastTouch.clientY - secondToLastTouch.clientY) / dt,
        };
      }
      if (pageSize) {
        // $FlowAssert
        let targetX = Math.min(Math.max(Math.round(this._p.x / pageSize + Math.min(Math.max(v.x, -0.5), 0.5)), props.constraintX.min / pageSize), props.constraintX.max / pageSize) * pageSize;
        // TODO: y
        let springX = createSpring(targetX);
        this._motion = new Motion(function(p: Point, vm: Vector, dt: number) {
          let [vX, shouldStopX] = springX(p.x, vm.x, dt);
          return [{ x: vX, y: 0 }, shouldStopX];
        });
        this._motion.start(this._p, v, this._updater, this._onMotionEnd);
      } else if (momentum) {
        let scrollX = props.constraintX ? createScroll(props.constraintX) : Friction;
        let scrollY = props.constraintY ? createScroll(props.constraintY) : Friction;
        this._motion = new Motion(function(p: Point, vm: Vector, dt: number) {
          let [vX, shouldStopX] = scrollX(p.x, vm.x, dt);
          let [vY, shouldStopY] = scrollY(p.y, vm.y, dt);
          return [{ x: vX, y: vY }, shouldStopX && shouldStopY];
        });
        this._motion.start(this._p, v, this._updater, this._onMotionEnd);
      }
    } else {
      this.isControlledByDraggable = false;
      this._onDragEnd && this._onDragEnd(this._p);
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
    // reapply hard constraints here. motion might cause overshoot.
    this._p = this._applyHardConstraints(p);
    this._layerUpdater(this._p);
  };

  _onMotionEnd = (p: Point) => {
    this.isControlledByDraggable = false;
    const onDragEnd = this._onDragEnd;
    // reapply hard constraints here. motion might cause overshoot.
    onDragEnd && onDragEnd(this._applyHardConstraints(p));
  };

  _applyHardConstraints = (p: Point) => ({
    x: this.props && this.props.constraintX && this.props.constraintX.type === 'hard' ? this.props.constraintX.point(p.x) : p.x,
    y: this.props && this.props.constraintY && this.props.constraintY.type === 'hard' ? this.props.constraintY.point(p.y) : p.y,
  });
}
