/* @flow */
export default class Motion {
  _start: Point;
  _p: Point;
  _v: Vector;
  _a: (p: Point, v: Vector, dt: number) => Vector;
  _updater: (p: Point) => void;
  _startTime: number;
  _lastUpdateTime: number;
  _raf: number;

  constructor(a: (p: Point, v: Vector, dt: number) => Vector, updater: (p: Point) => void) {
    this._a = a;
    this._updater = updater;
  }

  start(start: Point, v: Vector) {
    this._start = start;
    this._p = start;
    this._v = v;

    this._startTime = Date.now();
    this._lastUpdateTime = this._startTime;
    this._tick();
  }

  stop() {
    cancelAnimationFrame(this._raf);
  }

  _tick = () => {
    let now = Date.now();
    let dt = now - this._lastUpdateTime;
    this._p = {
      x: this._p.x + (this._v.x * dt),
      y: this._p.y + (this._v.y * dt),
    };
    this._updater(this._p);
    this._v = this._a(this._p, this._v, now - this._lastUpdateTime);
    this._lastUpdateTime = now;
    this._raf = requestAnimationFrame(this._tick);
  };
}
