/* @flow */

import { constrain, constrainHardOnly, isConstrained } from './DragConfig';
import Motion from './Motion';
import createScroll from './motion/createScroll';
import createSpring from './motion/createSpring';
import Friction from './motion/Friction';

let activeDraggables = [];
const DRAG_START_THRESHOLD = 3;

function getPageTarget(x: number, v: number, config: DragConfig) {
  let pageSize = ((config.pageSize: any): number);
  let min = ((config.min: any): number);
  let max = ((config.max: any): number);
  let pageIndex = Math.min(
    Math.max(
      Math.round((x - min) / pageSize + Math.min(Math.max(v, -0.5), 0.5)),
      0
    ),
    (max - min) / pageSize
  );
  return min + pageIndex * pageSize;
}

function getMomentumFunction(x: number, v: number, config: ?DragConfig) {
  if (config && config.momentum === true) {
    let { pageSize } = config;
    if (pageSize) {
      return createSpring(getPageTarget(x, v, config));
    } else if (config.min != null || config.max != null) {
      return createScroll(config);
    }
    return Friction;
  }
  return (x, v, dt) => [0, true];
}

export default class Draggable {
  _config: {
    x?: ?DragConfig,
    y?: ?DragConfig,
  } = {};
  _isControlledByDraggable = false;

  _layer: HTMLElement;
  _p: Point;
  _dragStart: ?Point;
  _dragCaptured: boolean;
  _touches: Object[];
  _motion: Motion;
  _onDragStart: ?() => void;
  _layerUpdater: (p: Point) => void;
  /* callback on end of drag animation */
  _onDragEnd: ?(p: Point) => void;

  start(
    layer: HTMLElement,
    initialPoint: Point,
    onDragStart: ?() => void,
    updater: (p: Point) => void,
    onDragEnd: ?(p: Point) => void
  ) {
    this._layer = layer;
    this._p = { ...initialPoint };
    this._onDragStart = onDragStart;
    this._layerUpdater = updater;
    this._onDragEnd = onDragEnd;
    this._layer.addEventListener('touchstart', this._onTouchStart, false);
    this._layer.addEventListener('touchmove', this._onTouchMove, false);
    this._layer.addEventListener('touchend', this._onTouchEnd, false);
    this._layer.addEventListener('mousedown', this._onTouchStart, false);
    document.addEventListener('mousemove', this._onTouchMove, false);
    document.addEventListener('mouseup', this._onTouchEnd, false);
  }

  setConfig(property: 'x' | 'y', config: ?DragConfig) {
    this._config[property] = config;
  }

  setPoint(p: Point) {
    this._p = { ...p };
  }

  getPoint(): Point {
    return this._p;
  }

  isActive() {
    return this._isControlledByDraggable;
  }

  stop() {
    this._isControlledByDraggable = false;
    if (this._motion) {
      this._motion.stop();
    }
    this._layer.removeEventListener('touchstart', this._onTouchStart);
    this._layer.removeEventListener('touchmove', this._onTouchMove);
    this._layer.removeEventListener('touchend', this._onTouchEnd);
    this._layer.removeEventListener('mousedown', this._onTouchStart);
    document.removeEventListener('mousemove', this._onTouchMove);
    document.removeEventListener('mouseup', this._onTouchEnd);
  }

  end() {
    this._dragStart = null;
    this._isControlledByDraggable = false;
    activeDraggables = activeDraggables.filter(d => d !== this);
  }

  _onTouchStart = (e: Event) => {
    if (this._motion) {
      this._motion.stop();
    }
    this._isControlledByDraggable = true;
    this._dragCaptured = false;
    // TODO: handle when already constrained
    this._dragStart = { ...this._p };
    this._touches = [];
    this._addTouch(this._getTouch(e));
    activeDraggables.push(this);
    if (this._onDragStart) {
      this._onDragStart();
    }
  };

  _onTouchMove = (e: Event) => {
    const dragStart = this._dragStart;
    if (!dragStart) {
      return;
    }
    let touch = this._getTouch(e);
    let x = dragStart.x;
    if (this._config.x) {
      x += touch.clientX - this._touches[0].clientX;
    }
    let y = dragStart.y;
    if (this._config.y) {
      y += touch.clientY - this._touches[0].clientY;
    }
    this._p = {
      x: constrain(x, this._config.x),
      y: constrain(y, this._config.y),
    };
    if (
      !this._dragCaptured &&
      (Math.abs(this._p.x - dragStart.x) > DRAG_START_THRESHOLD ||
        Math.abs(this._p.y - dragStart.y) > DRAG_START_THRESHOLD)
    ) {
      if (activeDraggables.length > 1) {
        // this draggable has captured the event. end other active listeners
        activeDraggables.forEach(
          draggable => draggable !== this && draggable.end()
        );
      }
      this._dragCaptured = true;
    }
    if (this._dragCaptured) {
      this._updater(this._p);
    }
    this._addTouch(touch);
  };

  _onTouchEnd = () => {
    if (!this._dragStart) {
      return;
    }
    // splitting this allows clients to modify props on touchend
    window.requestAnimationFrame(this._onTouchEndMotion);

    this._dragStart = null;
    activeDraggables = activeDraggables.filter(d => d !== this);
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
    let momentumX = this._config.x && this._config.x.momentum === true;
    let momentumY = this._config.y && this._config.y.momentum === true;
    if (momentumX || momentumY) {
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

      let fX = getMomentumFunction(this._p.x, v.x, this._config.x);
      let fY = getMomentumFunction(this._p.y, v.y, this._config.y);
      this._motion = new Motion((p: Point, vm: Vector, dt: number) => {
        if (
          momentumX &&
          momentumY &&
          vm.x &&
          vm.y &&
          !isConstrained(p.x, this._config.x) &&
          !isConstrained(p.y, this._config.y)
        ) {
          let vHypotenuse = Math.sqrt(vm.x * vm.x + vm.y * vm.y);
          let [nextV, shouldStop] = Friction(0, vHypotenuse, dt);
          return [
            { x: vm.x / vHypotenuse * nextV, y: vm.y / vHypotenuse * nextV },
            shouldStop,
          ];
        }

        let [vX, shouldStopX] = fX(p.x, vm.x, dt);
        let [vY, shouldStopY] = fY(p.y, vm.y, dt);
        return [{ x: vX, y: vY }, shouldStopX && shouldStopY];
      });
      this._motion.start(this._p, v, this._updater, this._onMotionEnd);
    } else {
      this._isControlledByDraggable = false;
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
    this._isControlledByDraggable = false;
    const onDragEnd = this._onDragEnd;
    // reapply hard constraints here. motion might cause overshoot.
    onDragEnd && onDragEnd(this._applyHardConstraints(p));
  };

  _applyHardConstraints = (p: Point) => ({
    x: constrainHardOnly(p.x, this._config.x),
    y: constrainHardOnly(p.y, this._config.y),
  });
}
