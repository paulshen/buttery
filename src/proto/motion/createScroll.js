/* @flow */
import Friction from './Friction';
import createSpring from './createSpring';

// $FlowIgnore
function Stop() {
  return [0, true];
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
        this._accelerationFunction = bounce ? createSpring(min) : Stop;
      }
      if (typeof max === 'number' && x >= max) {
        this._accelerationFunction = bounce ? createSpring(max) : Stop;
      }
    }
    return this._accelerationFunction;
  }
}

export default function createScroll(config: DragConfig) {
  let s = new ScrollMotion(config);
  return function(x: number, v: number, dt: number) {
    return s.getAccelerationFunction(x)(x, v, dt);
  };
}
