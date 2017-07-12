/* @flow */

export function Frame(
  x: InputValue | DragValue,
  y: InputValue | DragValue,
  width: InputValue,
  height: InputValue
): FrameType {
  return { x, y, width, height };
}

export function Drag(value: InputValue, config?: DragConfig): DragValue {
  return {
    type: 'drag',
    value,
    config,
  };
}

export function Animated(value: ScalarValue, config: AnimatorConfig) {
  return {
    type: 'animated',
    value,
    config,
  };
}

export function timed(duration: number = 300): TimedAnimatorConfig {
  return {
    type: 'timed',
    duration,
  };
}

export function spring(
  spring: number = 0.0005,
  friction: number = 0.01
): SpringAnimatorConfig {
  return {
    type: 'spring',
    spring,
    friction,
  };
}
