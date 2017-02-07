/* @flow */
function constrain(value, min, max) {
  let constrainedValue = value;
  if (typeof min === 'number' && constrainedValue < min) {
    constrainedValue = min - Math.pow(Math.abs(constrainedValue - min), 0.85);
  }
  if (typeof max === 'number' && constrainedValue > max) {
    constrainedValue = max + Math.pow(Math.abs(constrainedValue - max), 0.85);
  }
  return constrainedValue;
}

export default class Constraint {
  min: ?number;
  max: ?number;

  constructor({ min, max }: { min?: number, max?: number }) {
    this.min = min;
    this.max = max;
  }

  point(x: number) {
    return constrain(x, this.min, this.max);
  }
}
