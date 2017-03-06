/* @flow */
import { interpolateProperties } from '../LayerProperties';

export default class TimedAnimator {
  _updater: (p: LayerProperties) => void;
  _onEnd: ?() => void;
  _duration: number;
  _start: number;
  _from: LayerProperties;
  _to: LayerProperties;
  _raf: number;

  constructor({ duration }: { duration: number }) {
    this._duration = duration;
  }

  start(from: LayerProperties, to: LayerProperties, updater: (p: LayerProperties) => void, onEnd: ?() => void) {
    this._start = Date.now();
    this._from = { ...from };
    this._to = { ...to };
    this._updater = updater;
    this._onEnd = onEnd;
    this._tick();
  }

  stop() {
    cancelAnimationFrame(this._raf);
  }

  _tick = () => {
    let now = Date.now();
    let t = Math.min((now - this._start) / this._duration, 1);
    this._updater(interpolateProperties(this._from, this._to, t));
    if (t < 1) {
      this._raf = requestAnimationFrame(this._tick);
    } else {
      this._onEnd && this._onEnd();
    }
  };
}
