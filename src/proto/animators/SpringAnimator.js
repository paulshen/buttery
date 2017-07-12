/* @flow */
import type Layer from '../Layer';

function interp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

export default class SpringAnimator implements Animator {
  _layer: Layer;
  _key: string;
  _config: SpringAnimatorConfig;
  _start: number;
  _lastUpdate: number;
  _from: ScalarValue;
  _to: ScalarValue;
  _x: number;
  _v: number;
  _value: ScalarValue;
  _updater: (value: ScalarValue) => void;
  _onEnd: ?Function;
  _raf: number;

  constructor(layer: Layer, key: string, config: SpringAnimatorConfig) {
    this._layer = layer;
    this._key = key;
    this._config = config;
  }

  start(
    from: ScalarValue,
    to: ScalarValue,
    updater: (value: ScalarValue) => void,
    onEnd: ?Function
  ) {
    this._start = Date.now();
    this._from = from;
    this._to = to;
    this._updater = updater;
    this._x = 0;
    this._v = 0;
    this._lastUpdate = Date.now();
    this._tick();
    this._onEnd = onEnd;
  }

  getValue(): ScalarValue {
    return this._value;
  }

  stop() {
    window.cancelAnimationFrame(this._raf);
  }

  _tick = () => {
    let now = Date.now();
    let dt = now - this._lastUpdate;
    if (this._x !== 1) {
      this._v -=
        ((this._x - 1) * this._config.spring +
          this._config.friction * this._v) *
        dt;
    }
    this._x += this._v * dt;
    this._value = interp(this._from, this._to, this._x);
    this._updater(this._value);
    if (Math.abs(this._x - 1) < 0.00001 && Math.abs(this._v) < 0.00001) {
      this._onEnd && this._onEnd();
    } else {
      this._lastUpdate = now;
      this._raf = window.requestAnimationFrame(this._tick);
    }
  };
}
