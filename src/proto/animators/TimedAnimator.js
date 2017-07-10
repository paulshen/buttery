/* @flow */
import { interpolateProperties } from '../AnimatedProperties';

function getKey(props: TimedAnimatorProps) {
  return `timed:${props.duration}`;
}

type TimedAnimatorProps = { duration: number };
export default function TimedAnimator(props: TimedAnimatorProps) {
  return {
    props,
    Klass: TimedAnimatorImpl,
    key: getKey(props),
  };
}

class TimedAnimatorImpl {
  key: string;
  _updater: (p: AnimatedProperties) => void;
  _onEnd: ?() => void;
  _duration: number;
  _start: number;
  _from: AnimatedProperties;
  _to: AnimatedProperties;
  _raf: number;

  constructor(props: TimedAnimatorProps) {
    this._duration = props.duration;
    this.key = getKey(props);
  }

  start(from: AnimatedProperties, to: AnimatedProperties, updater: (p: AnimatedProperties) => void, onEnd: ?() => void) {
    this._start = Date.now();
    this._from = { ...from };
    this._to = { ...to };
    this._updater = updater;
    this._onEnd = onEnd;
    this._tick();
  }

  stop() {
    window.cancelAnimationFrame(this._raf);
  }

  _tick = () => {
    let now = Date.now();
    let t = Math.min((now - this._start) / this._duration, 1);
    this._updater(interpolateProperties(this._from, this._to, t));
    if (t < 1) {
      this._raf = window.requestAnimationFrame(this._tick);
    } else {
      this._onEnd && this._onEnd();
    }
  };
}
