/* @flow */
const K = 0.005;
export default function Friction(
  x: number,
  v: number,
  elapsed: number,
  dt: number
) {
  let nextV = v > 0 ? Math.max(v - K * dt, 0) : Math.min(v + K * dt, 0);
  return [x + nextV * dt, nextV, nextV === 0];
}
