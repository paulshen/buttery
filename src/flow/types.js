type Point = {
  x: number,
  y: number,
};

type DragValue = { value: number };
type NumberOrDragValue = number | DragValue;

type FrameType = {
  x: NumberOrDragValue,
  y: NumberOrDragValue,
  width: number,
  height: number,
};

type ComputedFrameType = {
  x: number,
  y: number,
  width: number,
  height: number,
};

type Vector = {
  x: number,
  y: number,
};

type AnimatedProperties = {
  backgroundColor?: string,
  opacity?: number,
  rotation?: number,
  scaleX?: number,
  scaleY?: number,
  scale?: number,
  borderRadius?: number,
  shadowX?: ?number,
  shadowY?: ?number,
  shadowBlur?: ?number,
  shadowColor?: ?string,
  shadowSpread?: ?number,
};

type DragConstraintType = {
  min?: number,
  max?: number,
  bounce: boolean,
};
