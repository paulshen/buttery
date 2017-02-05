/* @flow */
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
  _minX: ?number;
  _maxX: ?number;
  _minY: ?number;
  _maxY: ?number;

  constructor({ minX, maxX, minY, maxY }: { minX?: number, maxX?: number, minY?: number, maxY?: number }) {
    this._minX = minX;
    this._maxX = maxX;
    this._minY = minY;
    this._maxY = maxY;
  }

  point(p: Point) {
    return {
      x: constrain(p.x, this._minX, this._maxX),
      y: constrain(p.y, this._minY, this._maxY),
    };
  }

  acceleration(p: Point, v: Vector) {
  }
}
