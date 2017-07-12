/* @flow */
import React from 'react';
import CSSPropertyOperations from 'react-dom/lib/CSSPropertyOperations';

export function applyProperties(
  node: HTMLElement,
  frame: ComputedFrameType,
  properties: ?AnimatedProperties
) {
  let {
    rotation,
    scaleX,
    scaleY,
    scale,
    shadowX,
    shadowY,
    shadowBlur,
    shadowColor,
    shadowSpread,
    ...updates
  } =
    properties || {};
  let transformString = `translate3d(${frame.x}px,${frame.y}px,0)`;
  if (typeof rotation !== 'undefined') {
    transformString += ` rotate(${rotation}deg)`;
  }
  if (typeof scaleX !== 'undefined') {
    transformString += ` scaleX(${scaleX})`;
  }
  if (typeof scaleY !== 'undefined') {
    transformString += ` scaleY(${scaleY})`;
  }
  if (typeof scale !== 'undefined') {
    transformString += ` scale(${scale})`;
  }
  updates.transform = transformString;
  if (shadowColor) {
    updates.boxShadow = `${shadowX || 0}px ${shadowY || 0}px ${shadowBlur ||
      0}px ${shadowSpread || 0}px ${shadowColor}`;
  }
  updates.width = frame.width;
  updates.height = frame.height;

  CSSPropertyOperations.setValueForStyles(node, updates, {
    _currentElement: {},
    _debugID: 'HACK',
  });
}

export function getTargetValue(value: ScalarValue | AnimatedValue | DragValue | any) {
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

export function areFramesSame(a: ComputedFrameType, b: ComputedFrameType) {
  return (
    a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
  );
}
export function arePropertiesSame(
  a: ?AnimatedProperties,
  b: ?AnimatedProperties
) {
  if (!a !== !b) {
    return false;
  }
  if (!a || !b) {
    return true;
  }

  for (let key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for (let key in b) {
    if (!(key in a) || a[key] !== b[key]) {
      return false;
    }
  }
  return true;
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

function interp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}
export function interpolateFrame(
  from: ComputedFrameType,
  to: ComputedFrameType,
  t: number
): ComputedFrameType {
  return ['x', 'y', 'width', 'height'].reduce(
    (hash, prop) => {
      if (from[prop] != null && to[prop] != null) {
        hash[prop] = interp(from[prop], to[prop], t);
      }
      return hash;
    },
    { ...to }
  );
}
export function interpolateProperties(
  from: AnimatedProperties,
  to: AnimatedProperties,
  t: number
): AnimatedProperties {
  return [
    'opacity',
    'rotation',
    'scaleX',
    'scaleY',
    'scale',
    'borderRadius',
    'shadowX',
    'shadowY',
    'shadowBlur',
    'shadowSpread',
  ].reduce(
    (hash, prop) => {
      if (from[prop] != null && to[prop] != null) {
        hash[prop] = interp(from[prop], to[prop], t);
      }
      return hash;
    },
    { ...to }
  );
}
