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

export default class DragConstraint {
  min: ?number;
  max: ?number;
  type: 'hard' | 'bounce';

  constructor({ min, max, type }: { min?: number, max?: number, type?: 'hard' | 'bounce' }) {
    this.min = min;
    this.max = max;
    this.type = type || 'hard';
  }

  point(x: number): number {
    switch (this.type) {
    case 'bounce':
      return constrainWithBounce(x, this.min, this.max);
    default:
      return constrain(x, this.min, this.max);
    }
  }
}
