/* @flow */
const K = 0.005;
export default function Friction(x: number, v: number, dt: number) {
  let nextV = v > 0 ? Math.max(v - K * dt, 0) : Math.min(v + K * dt, 0);
  return [nextV, nextV === 0];
}
