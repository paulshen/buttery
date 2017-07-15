/* @flow */
import Friction from './Friction';
import createSpring from './createSpring';

function Stop(x: number, v: number, secPerStep: number, elapsed: number) {
  return [x, 0, true];
}

class ScrollMotion {
  _config: DragConfig;
  _target: Point;
  _accelerationFunction = Friction;

  constructor(config: DragConfig) {
    this._config = config;
  }

  getAccelerationFunction(x: number) {
    if (this._accelerationFunction === Friction) {
      let { min, max, bounce } = this._config;
      if (typeof min === 'number' && x <= min) {
        this._accelerationFunction = bounce
          ? createSpring(min, 0.00008, 0.025)
          : Stop;
      }
      if (typeof max === 'number' && x >= max) {
        this._accelerationFunction = bounce
          ? createSpring(max, 0.00008, 0.025)
          : Stop;
      }
    }
    return this._accelerationFunction;
  }
}

export default function createScroll(config: DragConfig) {
  let s = new ScrollMotion(config);
  return function(x: number, v: number, secPerStep: number, elapsed: number) {
    return s.getAccelerationFunction(x)(x, v, secPerStep, elapsed);
  };
}
