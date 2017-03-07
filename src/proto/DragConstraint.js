/* @flow */
function constrainBounce(value, min, max) {
  let constrainedValue = value;
  if (typeof min === 'number' && constrainedValue < min) {
    constrainedValue = min - Math.abs(constrainedValue - min) ** 0.85;
  }
  if (typeof max === 'number' && constrainedValue > max) {
    constrainedValue = max + Math.abs(constrainedValue - max) ** 0.85;
  }
  return constrainedValue;
}

function constrainHard(value, min, max) {
  let constrainedValue = value;
  if (typeof min === 'number') {
    constrainedValue = Math.max(constrainedValue, min);
  }
  if (typeof max === 'number') {
    constrainedValue = Math.min(constrainedValue, max);
  }
  return constrainedValue;
}

export function constrain(x: number, constraint: DragConstraintType): number {
  switch (constraint.type) {
  case 'bounce':
    return constrainBounce(x, constraint.min, constraint.max);
  default:
    return constrainHard(x, constraint.min, constraint.max);
  }
}

export default function DragConstraint({ min, max, type }: {
  min?: number,
  max?: number,
  type?: 'hard' | 'bounce',
}): DragConstraintType {
  return {
    min,
    max,
    type: type || 'hard',
  };
}
