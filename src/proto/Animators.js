/* @flow */
import type Layer from './Layer';

let animators: { [layerID: string]: { [key: string]: Animator } } = {};

export function getAnimator(layer: Layer, key: string): ?Animator {
  let layerID = layer.getID();
  return animators[layerID] && animators[layerID][key];
}

export function createAnimator(
  layer: Layer,
  key: string,
  config: TimedAnimatorConfig | SpringAnimatorConfig
): Animator {
  let layerID = layer.getID();
  if (!animators[layerID]) {
    animators[layerID] = {};
  }
  if (animators[layerID][key]) {
    animators[layerID][key].stop();
  }
  if (config.type === 'timed') {
    animators[layerID][key] = new TimedAnimatorImpl(layer, key, config);
  }
  if (config.type === 'spring') {
    animators[layerID][key] = new SpringAnimatorImpl(layer, key, config);
  }
  return animators[layerID][key];
}

function interp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

class TimedAnimatorImpl implements Animator {
  _layer: Layer;
  _key: string;
  _config: TimedAnimatorConfig;
  _start: number;
  _from: ScalarValue;
  _to: ScalarValue;
  _value: ScalarValue;
  _updater: (value: ScalarValue) => void;
  _onEnd: ?Function;
  _raf: number;

  constructor(layer: Layer, key: string, config: TimedAnimatorConfig) {
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
    let t = Math.min((now - this._start) / this._config.duration, 1);
    this._value = interp(this._from, this._to, t);
    this._updater(this._value);
    if (t < 1) {
      this._raf = window.requestAnimationFrame(this._tick);
    } else {
      // this._onEnd && this._onEnd();
    }
  };
}

class SpringAnimatorImpl {
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
