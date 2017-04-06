/* @flow */
const SpringK = 0.0001;
const FrictionK = 0.02;
export default function createSpring(target: number) {
  return function Spring(x: number, vParam: number, dt: number) {
    let v = vParam;
    if (x !== target) {
      v -= ((x - target) * SpringK + FrictionK * v) * dt;
    }
    return [v, Math.abs(x - target) < 0.01 && Math.abs(v) < 0.01];
  };
}
