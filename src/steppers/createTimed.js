/* @flow */
export default function createTimed(duration: number) {
  return function Timed(
    xParam: number,
    vParam: number,
    secPerStep: number,
    elapsed: number
  ) {
    if (elapsed > duration) {
      return [1, 0, true];
    }
    return [elapsed / duration, 1 / duration, false];
  };
}
