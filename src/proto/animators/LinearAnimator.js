/* @flow */
export default class LinearAnimator {
  _updater: (t: number) => void;
  _duration: number;
  _start: number;
  _raf: number;

  constructor(duration: number) {
    this._duration = duration;
  }

  start(updater: (t: number) => void) {
    this._start = Date.now();
    this._updater = updater;
    this._tick();
  }

  stop() {
    cancelAnimationFrame(this._raf);
  }

  _tick = () => {
    let now = Date.now();
    let t = Math.min((now - this._start) / this._duration, 1);
    this._updater(t);
    if (t < 1) {
      this._raf = requestAnimationFrame(this._tick);
    }
  };
}
