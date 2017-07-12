/* @flow */

export function Frame(
  x: InputValue | DragValue,
  y: InputValue | DragValue,
  width: InputValue,
  height: InputValue
): FrameType {
  return { x, y, width, height };
}

export function Drag(value: InputValue): DragValue {
  return {
    value,
    type: 'drag',
  };
}
