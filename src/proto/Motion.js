/* @flow */
import type Constraint from './Constraint';

export default class Motion {
  _start: Point;
  _p: Point;
  _v: Vector;
  _a: (p: Point, v: Vector, dt: number) => [Vector, boolean];
  _updater: (p: Point) => void;
  _startTime: number;
  _lastUpdateTime: number;
  _raf: number;

  constructor(a: (p: Point, v: Vector, dt: number) => [Vector, boolean]) {
    this._a = a;
  }

  start(start: Point, v: Vector, updater: (p: Point) => void) {
    this._start = { ...start };
    this._p = this._start;
    this._v = v;
    this._updater = updater;

    this._startTime = Date.now();
    this._lastUpdateTime = this._startTime;
    this._tick();
  }

  stop() {
    cancelAnimationFrame(this._raf);
  }

  _setAccelerationFunction = (a: (p: Point, v: Vector, dt: number) => [Vector, boolean]) => {
    this._a = a;
  };

  _tick = () => {
    let now = Date.now();
    let dt = now - this._lastUpdateTime;
    this._p = {
      x: this._p.x + (this._v.x * dt),
      y: this._p.y + (this._v.y * dt),
    };
    this._updater(this._p);
    let [nextV, shouldStop] = this._a(this._p, this._v, dt);
    this._v = nextV;
    this._lastUpdateTime = now;
    if (!shouldStop) {
      this._raf = requestAnimationFrame(this._tick);
    }
  };
}
