/* @flow */
export default function createSpring(
  target: number,
  springK: number,
  frictionK: number
) {
  return function Spring(
    xParam: number,
    vParam: number,
    secPerStep: number,
    elapsed: number
  ) {
    let x = xParam;
    let v = vParam;
    if (x !== target) {
      v -= ((x - target) * springK + frictionK * v) * secPerStep;
    }
    x += v * secPerStep;
    let shouldStop =
      Math.abs(x - target) / target < 0.00001 && Math.abs(v) < 0.00001;
    return [shouldStop ? target : x, v, shouldStop];
  };
}
