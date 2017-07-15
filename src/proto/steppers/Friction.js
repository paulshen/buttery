/* @flow */
const K = 0.005;
export default function Friction(
  x: number,
  v: number,
  secPerStep: number,
  elapsed: number
) {
  let nextV =
    v > 0 ? Math.max(v - K * secPerStep, 0) : Math.min(v + K * secPerStep, 0);
  return [x + nextV * secPerStep, nextV, nextV === 0];
}
