/* @flow */
import type Layer from './Layer';

type Animator = Object;
let animators: { [layerID: string]: { [key: string]: Animator } } = {};

export function getAnimator(layer: Layer, key: string): ?Animator {
  let layerID = layer.getID();
  return animators[layerID] && animators[layerID][key];
}

export function createAnimator(
  layer: Layer,
  key: string,
  config: TimedAnimatorConfig
): Animator {
  let layerID = layer.getID();
  if (!animators[layerID]) {
    animators[layerID] = {};
  }
  if (animators[layerID][key]) {
    animators[layerID][key].stop();
  }
  animators[layerID][key] = new TimedAnimatorImpl(layer, key, config);
  return animators[layerID][key];
}

function interp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

class TimedAnimatorImpl {
  _layer: Layer;
  _key: string;
  _config: TimedAnimatorConfig;
  _start: number;
  _from: ScalarValue;
  _to: ScalarValue;
  _value: ScalarValue;
  _updater: (value: ScalarValue) => void;
  _raf: number;

  constructor(layer: Layer, key: string, config: TimedAnimatorConfig) {
    this._layer = layer;
    this._key = key;
    this._config = config;
  }

  start(
    from: ScalarValue,
    to: ScalarValue,
    updater: (value: ScalarValue) => void
  ) {
    this._start = Date.now();
    this._from = from;
    this._to = to;
    this._updater = updater;
    this._tick();
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
