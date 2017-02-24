/* @flow */
import DragConstraint from '../DragConstraint';
import Motion from '../Motion';
import Friction from './Friction';
import createSpring from './createSpring';

function Stop(x: number, v: number, dt: number) {
  return [0, true];
}

class ScrollMotion {
  _constraint: DragConstraint;
  _target: Point;
  _accelerationFunction = Friction;

  constructor(constraint: DragConstraint) {
    this._constraint = constraint;
  }

  getAccelerationFunction(x: number) {
    if (this._accelerationFunction === Friction) {
      let { min, max, type } = this._constraint;
      if (typeof min === 'number' && x < min) {
        this._accelerationFunction = type === 'bounce' ? createSpring(min) : Stop;
      }
      if (typeof max === 'number' && x > max) {
        this._accelerationFunction = type === 'bounce' ? createSpring(max) : Stop;
      }
    }
    return this._accelerationFunction;
  }
}

export default function createScroll(constraint: DragConstraint) {
  let s = new ScrollMotion(constraint);
  return function(x: number, v: number, dt: number) {
    return s.getAccelerationFunction(x)(x, v, dt);
  };
}
