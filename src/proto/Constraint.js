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

  x(x: number) {
    return constrain(x, this._minX, this._maxX);
  }

  y(y: number) {
    return constrain(y, this._minY, this._maxY);
  }
}
