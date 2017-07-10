/* @flow */
import { interpolateFrame, interpolateProperties } from '../AnimatedProperties';

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
  _updater: (f: Rect, p: AnimatedProperties) => void;
  _onEnd: ?() => void;
  _duration: number;
  _start: number;
  _fromFrame: Rect;
  _fromProperties: AnimatedProperties;
  _toFrame: Rect;
  _toProperties: AnimatedProperties;
  _raf: number;

  constructor(props: TimedAnimatorProps) {
    this._duration = props.duration;
    this.key = getKey(props);
  }

  start(fromFrame: Rect, fromProperties: AnimatedProperties, toFrame: Rect, toProperties: ?AnimatedProperties, updater: (f: Rect, p: AnimatedProperties) => void, onEnd: ?() => void) {
    this._start = Date.now();
    this._fromFrame = { ...fromFrame };
    this._fromProperties = { ...fromProperties };
    this._toFrame = { ...toFrame };
    this._toProperties = { ...toProperties };
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
    this._updater(
      interpolateFrame(this._fromFrame, this._toFrame, t),
      interpolateProperties(this._fromProperties, this._toProperties, t)
    );
    if (t < 1) {
      this._raf = window.requestAnimationFrame(this._tick);
    } else {
      this._onEnd && this._onEnd();
    }
  };
}
