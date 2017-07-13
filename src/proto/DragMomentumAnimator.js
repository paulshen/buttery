/* @flow */
import { constrain, constrainHardOnly, isConstrained } from './DragConfig';
import createScroll from './motion/createScroll';
import createSpring from './motion/createSpring';
import Friction from './motion/Friction';

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
      return createSpring(getPageTarget(x, v, config), 0.0001, 0.02);
    } else if (config.min != null || config.max != null) {
      return createScroll(config);
    }
    return Friction;
  }
  return (x, v, elapsed, dt) => [x, 0, true];
}

export default class DragMomentumAnimator {
  _xConfig: ?DragConfig;
  _yConfig: ?DragConfig;
  _fX: (
    x: ScalarValue,
    v: number,
    elapsed: number,
    dt: number
  ) => [number, number, boolean];
  _fY: (
    x: ScalarValue,
    v: number,
    elapsed: number,
    dt: number
  ) => [number, number, boolean];
  _p: Point;
  _v: Vector;
  _updater: (p: Point) => void;
  _onEnd: Function;
  _startTime: number;
  _lastUpdateTime: number;
  _raf: number;

  constructor(xConfig: ?DragConfig, yConfig: ?DragConfig) {
    this._xConfig = xConfig;
    this._yConfig = yConfig;
  }

  start(p: Point, v: Vector, updater: (p: Point) => void, onEnd: Function) {
    this._p = p;
    this._v = v;
    this._updater = updater;
    this._onEnd = onEnd;
    this._fX = getMomentumFunction(p.x, v.x, this._xConfig);
    this._fY = getMomentumFunction(p.y, v.y, this._yConfig);

    this._startTime = Date.now();
    this._lastUpdateTime = this._startTime;
    this._tick();
  }

  stop() {
    window.cancelAnimationFrame(this._raf);
  }

  _tick = () => {
    let now = Date.now();
    let dt = now - this._lastUpdateTime;
    let nextP;
    let nextV;
    let shouldStop;
    if (
      this._xConfig &&
      this._xConfig.momentum === true &&
      this._yConfig &&
      this._yConfig.momentum === true &&
      this._v.x &&
      this._v.y &&
      !isConstrained(this._p.x, this._xConfig) &&
      !isConstrained(this._p.y, this._yConfig)
    ) {
      let vHypotenuse = Math.sqrt(
        this._v.x * this._v.x + this._v.y * this._v.y
      );
      let [_, nextVHyp, shouldStopHyp] = Friction(
        0,
        vHypotenuse,
        now - this._startTime,
        dt
      );
      nextV = {
        x: this._v.x / vHypotenuse * nextVHyp,
        y: this._v.y / vHypotenuse * nextVHyp,
      };
      nextP = {
        x: this._p.x + nextV.x * dt,
        y: this._p.y + nextV.y * dt,
      };
      shouldStop = shouldStopHyp;
    } else {
      let [x, vX, shouldStopX] = this._fX(
        this._p.x,
        this._v.x,
        now - this._startTime,
        dt
      );
      let [y, vY, shouldStopY] = this._fY(
        this._p.y,
        this._v.y,
        now - this._startTime,
        dt
      );
      nextP = { x, y };
      nextV = { x: vX, y: vY };
      shouldStop = shouldStopX && shouldStopY;
    }

    this._p = nextP;
    this._v = nextV;
    this._updater(this._p);
    this._lastUpdateTime = now;
    if (!shouldStop) {
      this._raf = window.requestAnimationFrame(this._tick);
    } else {
      this._onEnd && this._onEnd(this._p);
    }
  };
}
