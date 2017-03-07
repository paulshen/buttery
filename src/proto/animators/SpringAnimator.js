/* @flow */
import { interpolateProperties } from '../LayerProperties';

function getKey(spring?: number, friction?: number) {
  return `spring:${spring == null ? '_' : spring}:${friction == null ? '_' : friction}`;
}

type SpringAnimatorProps = { spring?: number, friction?: number };
export default function SpringAnimator(props?: SpringAnimatorProps) {
  return {
    props,
    Klass: SpringAnimatorImpl,
    key: getKey(props && props.spring, props && props.friction),
  };
}

class SpringAnimatorImpl {
  _spring: number;
  _friction: number;

  key: string;
  _updater: (p: LayerProperties) => void;
  _onEnd: ?() => void;
  _start: number;
  _from: LayerProperties;
  _to: LayerProperties;
  _x: number;
  _v: number;
  _lastUpdate: number;
  _raf: number;

  constructor(props?: SpringAnimatorProps) {
    let p = props || {};
    this._spring = p.spring || 0.0005;
    this._friction = p.friction || 0.01;
    this.key = getKey(p.spring, p.friction);
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
