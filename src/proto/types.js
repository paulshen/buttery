type ScalarValue = number;

type TimedAnimatorConfig = {
  type: 'timed',
  duration: number,
};
type SpringAnimatorConfig = {
  type: 'spring',
  spring: number,
  friction: number,
};
type AnimatorConfig = TimedAnimatorConfig | SpringAnimatorConfig;
type AnimatedValue = {
  type: 'animated',
  value: ScalarValue,
  config: AnimatorConfig,
  onEnd: ?Function,
};

type DragValue = {
  type: 'drag',
  value: ScalarValue | AnimatedValue,
  config?: DragConfig,
};
type DragConfig = {
  min?: number,
  max?: number,
  bounce?: boolean,
  momentum?: boolean,
  pageSize?: number,
};

type InputValue = ScalarValue | AnimatedValue;
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

type Point = {
  x: number,
  y: number,
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
