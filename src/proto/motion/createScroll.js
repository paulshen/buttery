/* @flow */
import DragConstraint from '../DragConstraint';
import Motion from '../Motion';
import Friction from './Friction';
import createSpring from './createSpring';

class ScrollMotion {
  _constraint: DragConstraint;
  _target: Point;
  _accelerationFunction = Friction;

  constructor(constraint: DragConstraint) {
    this._constraint = constraint;
  }

  getAccelerationFunction(x: number, min: ?number, max: ?number) {
    if (this._accelerationFunction === Friction) {
      if (typeof min === 'number' && x < min) {
        this._accelerationFunction = createSpring(min);
      }
      if (typeof max === 'number' && x > max) {
        this._accelerationFunction = createSpring(max);
      }
    }
    return this._accelerationFunction;
  }
}

export default function createScroll(constraint: DragConstraint) {
  let s = new ScrollMotion(constraint);
  return function(x: number, v: number, dt: number) {
    return s.getAccelerationFunction(x, constraint.min, constraint.max)(x, v, dt);
  };
}
