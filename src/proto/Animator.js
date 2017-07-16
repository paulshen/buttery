/* @flow */
import createSpring from './steppers/createSpring';
import createTimed from './steppers/createTimed';
import type Layer from './Layer';

function interp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

const STEPS_PER_SEC = 60;
const SEC_PER_STEP = 1 / STEPS_PER_SEC;

export default class Animator {
  _layer: Layer;
  _key: string;
  _startTime: number;
  _stepsCompleted: number;
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

  constructor(layer: Layer, key: string, config: AnimatorConfig) {
    this._layer = layer;
    this._key = key;
    if (config.type === 'timed') {
      this._stepper = createTimed(config.duration);
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
    this._startTime = Date.now();
    this._stepsCompleted = 0;
    this._x = 0;
    this._v = 0;
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
    let shouldStop = false;
    let stepsNeeded =
      Math.floor((now - this._startTime) / 1000 / SEC_PER_STEP) -
      this._stepsCompleted;

    for (let i = 0; i < stepsNeeded && !shouldStop; i++) {
      let [nextX, nextV, stepShouldStop] = this._stepper(
        this._x,
        this._v,
        SEC_PER_STEP,
        now - this._startTime
      );
      this._x = nextX;
      this._v = nextV;
      shouldStop = stepShouldStop;
    }
    this._stepsCompleted += stepsNeeded;
    this._value = interp(this._from, this._to, this._x);
    this._updater(this._value);
    if (shouldStop) {
      this._onEnd && this._onEnd();
    } else {
      this._raf = window.requestAnimationFrame(this._tick);
    }
  };
}
