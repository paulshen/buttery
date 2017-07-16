/* @flow */
const K = 3;
export default function Friction(
  x: number,
  v: number,
  secPerStep: number,
  elapsed: number
) {
  let dv = -K * v * secPerStep;
  let nextV = v > 0 ? Math.max(v + dv, 0) : Math.min(v + dv, 0);
  return [x + nextV * secPerStep, nextV, Math.abs(dv) < 0.00001];
}
