/* @flow */

export function Frame(
  x: NumberOrDragValue,
  y: NumberOrDragValue,
  width: number,
  height: number
): FrameType {
  return { x, y, width, height };
}

export function Drag(value: number): DragValue {
  return {
    value,
  };
}

export function isFrameDraggable(f: FrameType) {
  return typeof f.x !== 'number' || typeof f.y !== 'number';
}
