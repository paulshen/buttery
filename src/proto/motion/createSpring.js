/* @flow */
const SpringK = 0.0001;
const FrictionK = 0.02;
export default function createSpring(target: number) {
  return function Spring(x: number, v: number, dt: number) {
    if (x !== target) {
      v -= ((x - target) * SpringK + FrictionK * v) * dt;
    }
    return [v, x === target && v === 0];
  }
}
