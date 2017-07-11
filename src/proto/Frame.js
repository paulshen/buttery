/* @flow */

export function Rect(
  x: NumberOrDragValue,
  y: NumberOrDragValue,
  width: number,
  height: number
): Frame {
  return { x, y, width, height };
}

export function Drag(value: number): DragValue {
  return {
    value,
  };
}

export function isFrameDraggable(f: Frame) {
  return typeof f.x !== 'number' || typeof f.y !== 'number';
}
