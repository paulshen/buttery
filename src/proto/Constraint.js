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
  minX: ?number;
  maxX: ?number;
  minY: ?number;
  maxY: ?number;

  constructor({ minX, maxX, minY, maxY }: { minX?: number, maxX?: number, minY?: number, maxY?: number }) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }

  point(p: Point) {
    return {
      x: constrain(p.x, this.minX, this.maxX),
      y: constrain(p.y, this.minY, this.maxY),
    };
  }
}
