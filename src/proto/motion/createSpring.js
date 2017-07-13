/* @flow */
export default function createSpring(
  target: number,
  springK: number,
  frictionK: number
) {
  return function Spring(
    xParam: number,
    vParam: number,
    elapsed: number,
    dt: number
  ) {
    let x = xParam;
    let v = vParam;
    if (x !== target) {
      v -= ((x - target) * springK + frictionK * v) * dt;
    }
    x += v * dt;
    return [
      x,
      v,
      Math.abs(x - target) / target < 0.00001 && Math.abs(v) < 0.00001,
    ];
  };
}
