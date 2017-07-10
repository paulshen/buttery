type Point = {
  x: number,
  y: number,
};

type Rect = {
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
  x: number,
  y: number,
  width: number,
  height: number,
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
