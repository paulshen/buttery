/* @flow */
import createSpring from './motion/createSpring';
import type Layer from './Layer';

function interp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

export default class Animator {
  _layer: Layer;
  _key: string;
  _start: number;
  _lastUpdate: number;
  _from: ScalarValue;
  _to: ScalarValue;
  _x: ScalarValue;
  _v: number;
  _value: ScalarValue;
  _stepper: (
    x: number,
    v: number,
    elapsed: number,
    dt: number
  ) => [number, number, boolean];
  _updater: (value: ScalarValue) => void;
  _onEnd: ?Function;
  _raf: number;

  constructor(
    layer: Layer,
    key: string,
    config: AnimatorConfig
  ) {
    this._layer = layer;
    this._key = key;
    if (config.type === 'timed') {
      let { duration } = config;
      this._stepper = (() => (
        x: number,
        v: number,
        elapsed: number,
        dt: number
      ) => {
        if (elapsed > duration) {
          return [1, 0, true];
        }
        return [elapsed / duration, 1 / duration, false];
      })();
    }
    if (config.type === 'spring') {
      this._stepper = createSpring(1, config.spring, config.friction);
    }
  }

  start(
    from: ScalarValue,
    to: ScalarValue,
    updater: (value: ScalarValue) => void,
    onEnd: ?Function
  ) {
    this._start = Date.now();
    this._x = 0;
    this._v = 0;
    this._lastUpdate = Date.now();
    this._value = from;
    this._from = from;
    this._to = to;
    this._updater = updater;
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
    let [nextX, nextV, shouldStop] = this._stepper(
      this._x,
      this._v,
      now - this._start,
      now - this._lastUpdate
    );
    this._x = nextX;
    this._v = nextV;
    this._value = interp(this._from, this._to, this._x);
    this._updater(this._value);
    if (shouldStop) {
      this._onEnd && this._onEnd();
    } else {
      this._lastUpdate = now;
      this._raf = window.requestAnimationFrame(this._tick);
    }
  };
}
