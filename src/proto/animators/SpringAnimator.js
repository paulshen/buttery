/* @flow */
import { interpolateFrame, interpolateProperties } from '../AnimatedProperties';

function getKey(props?: SpringAnimatorProps) {
  return `spring:${props && props.spring != null ? props.spring : '_'}:${props && props.friction != null ? props.friction : '_'}`;
}

type SpringAnimatorProps = { spring?: number, friction?: number };
export default function SpringAnimator(props?: SpringAnimatorProps) {
  return {
    props,
    Klass: SpringAnimatorImpl,
    key: getKey(props),
  };
}

class SpringAnimatorImpl {
  _spring: number;
  _friction: number;

  key: string;
  _updater: (f: Rect, p: AnimatedProperties) => void;
  _onEnd: ?() => void;
  _start: number;
  _fromFrame: Rect;
  _fromProperties: AnimatedProperties;
  _toFrame: Rect;
  _toProperties: AnimatedProperties;
  _x: number;
  _v: number;
  _lastUpdate: number;
  _raf: number;

  constructor(props?: SpringAnimatorProps) {
    let p = props || {};
    this._spring = p.spring || 0.0005;
    this._friction = p.friction || 0.01;
    this.key = getKey(props);
  }

  start(fromFrame: Rect, fromProperties: AnimatedProperties, toFrame: Rect, toProperties: ?AnimatedProperties, updater: (f: Rect, p: AnimatedProperties) => void, onEnd: ?() => void) {
    this._start = Date.now();
    this._fromFrame = { ...fromFrame };
    this._fromProperties = { ...fromProperties };
    this._toFrame = { ...toFrame };
    this._toProperties = { ...toProperties };
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
    this._updater(
      interpolateFrame(this._fromFrame, this._toFrame, this._x),
      interpolateProperties(this._fromProperties, this._toProperties, this._x)
    );
    if (Math.abs(this._x - 1) < 0.00001 && Math.abs(this._v) < 0.00001) {
      this._onEnd && this._onEnd();
    } else {
      this._lastUpdate = now;
      this._raf = window.requestAnimationFrame(this._tick);
    }
  };
}
