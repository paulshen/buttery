/* @flow */
export default class SpringAnimator {
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
    const SpringConstant = 0.4;
    this._updater(Math.pow(2, -10 * t) * Math.sin((t - SpringConstant / 4) * (2 * Math.PI) / SpringConstant) + 1);
    if (t < 1) {
      this._raf = requestAnimationFrame(this._tick);
    }
  };
}
