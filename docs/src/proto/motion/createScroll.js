/* @flow */
import Friction from './Friction';
import createSpring from './createSpring';

// $FlowIgnore
function Stop() {
  return [0, true];
}

class ScrollMotion {
  _constraint: DragConstraintType;
  _target: Point;
  _accelerationFunction = Friction;

  constructor(constraint: DragConstraintType) {
    this._constraint = constraint;
  }

  getAccelerationFunction(x: number) {
    if (this._accelerationFunction === Friction) {
      let { min, max, bounce } = this._constraint;
      if (typeof min === 'number' && x <= min) {
        this._accelerationFunction = bounce ? createSpring(min) : Stop;
      }
      if (typeof max === 'number' && x >= max) {
        this._accelerationFunction = bounce ? createSpring(max) : Stop;
      }
    }
    return this._accelerationFunction;
  }
}

export default function createScroll(constraint: DragConstraintType) {
  let s = new ScrollMotion(constraint);
  return function(x: number, v: number, dt: number) {
    return s.getAccelerationFunction(x)(x, v, dt);
  };
}
