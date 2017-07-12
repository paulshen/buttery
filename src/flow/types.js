type Point = {
  x: number,
  y: number,
};

type ScalarValue = number;
type TimedAnimatorConfig = { duration: number, type: 'timed' };
type SpringAnimatorConfig = {
  spring: number,
  friction: number,
  type: 'spring',
};
type AnimatedValue = {
  value: ScalarValue,
  config: TimedAnimatorConfig | SpringAnimatorConfig,
  type: 'animated',
};
type DragValue = { value: ScalarValue | AnimatedValue, type: 'drag' };
type InputValue = ScalarValue | AnimatedValue;

interface Animator {
  start(
    from: ScalarValue,
    to: ScalarValue,
    updater: (value: ScalarValue) => void
  ): void,
  getValue(): ScalarValue,
  stop(): void,
}

type FrameType = {
  x: InputValue | DragValue,
  y: InputValue | DragValue,
  width: InputValue,
  height: InputValue,
};

type ComputedFrameType = {
  x: ScalarValue,
  y: ScalarValue,
  width: ScalarValue,
  height: ScalarValue,
};

type Vector = {
  x: number,
  y: number,
};

type AnimatedProperties = {
  backgroundColor?: string,
  opacity?: InputValue,
  rotation?: InputValue,
  scaleX?: InputValue,
  scaleY?: InputValue,
  scale?: InputValue,
  borderRadius?: InputValue,
  shadowX?: ?InputValue,
  shadowY?: ?InputValue,
  shadowBlur?: ?InputValue,
  shadowColor?: ?string,
  shadowSpread?: ?InputValue,
};

type DragConstraintType = {
  min?: number,
  max?: number,
  bounce: boolean,
};
