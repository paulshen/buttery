/* @flow */
function constrainWithBounce(value, min, max) {
  let constrainedValue = value;
  if (typeof min === 'number' && constrainedValue < min) {
    constrainedValue = min - Math.pow(Math.abs(constrainedValue - min), 0.85);
  }
  if (typeof max === 'number' && constrainedValue > max) {
    constrainedValue = max + Math.pow(Math.abs(constrainedValue - max), 0.85);
  }
  return constrainedValue;
}

function constrain(value, min, max) {
  let constrainedValue = value;
  if (typeof min === 'number') {
    constrainedValue = Math.max(constrainedValue, min);
  }
  if (typeof max === 'number') {
    constrainedValue = Math.min(constrainedValue, max);
  }
  return constrainedValue;
}

export default class Constraint {
  min: ?number;
  max: ?number;
  edge: 'hard' | 'bounce';

  constructor({ min, max, edge }: { min?: number, max?: number, edge?: 'hard' | 'bounce' }) {
    this.min = min;
    this.max = max;
    this.edge = edge || 'hard';
  }

  point(x: number): number {
    switch (this.edge) {
    case 'bounce':
      return constrainWithBounce(x, this.min, this.max);
    default:
      return constrain(x, this.min, this.max);
    }
  }
}
