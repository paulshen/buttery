/* @flow */
import Constraint from '../Constraint';
import Motion from '../Motion';
import Friction from './Friction';
import createSpring from './createSpring';

class ScrollMotion {
  _constraint: Constraint;
  _target: Point;
  _accelerationFunction = Friction;

  constructor(constraint: Constraint) {
    this._constraint = constraint;
  }

  getAccelerationFunction(x: number) {
    if (this._accelerationFunction === Friction) {
      if (typeof this._constraint.minY === 'number' && x < this._constraint.minY) {
        this._accelerationFunction = createSpring(this._constraint.minY);
      }
      if (typeof this._constraint.maxY === 'number' && x > this._constraint.maxY) {
        this._accelerationFunction = createSpring(this._constraint.maxY);
      }
    }
    return this._accelerationFunction;
  }
}

export default function createScroll(constraint: Constraint) {
  let s = new ScrollMotion(constraint);
  return function(p: Point, v: Vector, dt: number) {
    let [v_y, shouldStop_y] = s.getAccelerationFunction(p.y)(p.y, v.y, dt);
    return [{
      x: 0, // TODO
      y: v_y,
    }, shouldStop_y];
  };
}
