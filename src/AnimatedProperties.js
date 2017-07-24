/* @flow */
import CSSPropertyOperations from 'react-dom/lib/CSSPropertyOperations';

export function getTargetValue(
  value: ScalarValue | AnimatedValue | DragValue | any
) {
  if (typeof value === 'object') {
    if (value.type === 'drag') {
      return getTargetValue(value.value);
    }
    if (value.type === 'animated') {
      return value.value;
    }
  }
  return value;
}

export function getDifferingProperties<T: Object>(a: ?T, b: ?T): $Keys<T>[] {
  if (!a !== !b) {
    if (a) {
      return Object.keys(a);
    } else if (b) {
      return Object.keys(b);
    }
  }
  if (!a || !b) {
    return [];
  }

  let differingProperties = [];
  for (let key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      differingProperties.push(key);
    }
  }
  for (let key in b) {
    if (!(key in a) || a[key] !== b[key]) {
      if (differingProperties.indexOf(key) === -1) {
        differingProperties.push(key);
      }
    }
  }
  return differingProperties;
}

export function applyUpdates(
  layer: HTMLElement,
  updates: Object,
  computedStyles: Object
) {
  let transformKeyDiffers = false;
  let transformUpdateKeys = [];
  let styleUpdates = {};
  Object.keys(updates).forEach(property => {
    let value = updates[property];
    if (
      ['x', 'y', 'rotate', 'scaleX', 'scaleY', 'scale'].indexOf(property) !== -1
    ) {
      if (value !== computedStyles[property]) {
        transformKeyDiffers = true;
      }
      transformUpdateKeys.push(property);
    } else if (value !== computedStyles[property]) {
      styleUpdates[property] = value;
    }
    if (value != null) {
      computedStyles[property] = value;
    } else {
      delete computedStyles[property];
    }
  });

  if (transformKeyDiffers) {
    let transformString = `translate3d(${computedStyles.x}px,${computedStyles.y}px,0)`;
    if (typeof computedStyles.rotate !== 'undefined') {
      transformString += ` rotate(${computedStyles.rotate}deg)`;
    }
    if (typeof computedStyles.scaleX !== 'undefined') {
      transformString += ` scaleX(${computedStyles.scaleX})`;
    }
    if (typeof computedStyles.scaleY !== 'undefined') {
      transformString += ` scaleY(${computedStyles.scaleY})`;
    }
    if (typeof computedStyles.scale !== 'undefined') {
      transformString += ` scale(${computedStyles.scale})`;
    }
    styleUpdates.transform = transformString;
  }
  CSSPropertyOperations.setValueForStyles(layer, styleUpdates, {
    _currentElement: {},
    _debugID: 'HACK',
  });

  return transformKeyDiffers;
}
