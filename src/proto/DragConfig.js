/* @flow */

export function isConstrained(value: number, config: ?DragConfig) {
  return (
    !!config &&
    ((typeof config.min === 'number' && value < config.min) ||
      (typeof config.max === 'number' && value > config.max))
  );
}

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

export function constrain(value: number, config: ?DragConfig): number {
  if (!config) {
    return value;
  }
  return constrainHard(value, config.min, config.max);
}

export function constrainHardOnly(value: number, config: ?DragConfig): number {
  if (!config) {
    return value;
  }
  return constrainHard(value, config.min, config.max);
}
