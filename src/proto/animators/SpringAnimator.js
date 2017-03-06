/* @flow */
import { interpolateProperties } from '../LayerProperties';

export default class SpringAnimator {
  _spring: number;
  _friction: number;

  _updater: (p: LayerProperties) => void;
  _onEnd: ?() => void;
  _start: number;
  _from: LayerProperties;
  _to: LayerProperties;
  _x: number;
  _v: number;
  _lastUpdate: number;
  _raf: number;

  constructor(spring?: number, friction?: number) {
    this._spring = spring || 0.0005;
    this._friction = friction || 0.01;
  }

  start(from: LayerProperties, to: LayerProperties, updater: (p: LayerProperties) => void, onEnd: ?() => void) {
    this._start = Date.now();
    this._from = { ...from };
    this._to = { ...to };
    this._x = 0;
    this._v = 0;
    this._updater = updater;
    this._onEnd = onEnd;
    this._lastUpdate = Date.now();
    this._raf = window.requestAnimationFrame(this._tick);
  }

  stop() {
    window.cancelAnimationFrame(this._raf);
  }

  _tick = () => {
    let now = Date.now();
    let dt = now - this._lastUpdate;
    if (this._x !== 1) {
      this._v -= ((this._x - 1) * this._spring + this._friction * this._v) * dt;
    }
    this._x += this._v * dt;
    this._updater(interpolateProperties(this._from, this._to, this._x));
    if (Math.abs(this._x - 1) < 0.00001 && Math.abs(this._v) < 0.00001) {
      this._onEnd && this._onEnd();
    } else {
      this._lastUpdate = now;
      this._raf = window.requestAnimationFrame(this._tick);
    }
  };
}
