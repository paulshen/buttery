/* @flow */

export function applyProperties(node: HTMLElement, frame: Rect, properties: ?AnimatedProperties) {
  let transformString = `translate3d(${frame.x}px,${frame.y}px,0)`;
  if (properties) {
    if (typeof properties.rotation !== 'undefined') {
      transformString += ` rotate(${properties.rotation}deg)`;
    }
    if (typeof properties.scaleX !== 'undefined') {
      transformString += ` scaleX(${properties.scaleX})`;
    }
    if (typeof properties.scaleY !== 'undefined') {
      transformString += ` scaleY(${properties.scaleY})`;
    }
    if (typeof properties.scale !== 'undefined') {
      transformString += ` scale(${properties.scale})`;
    }
  }
  node.style.transform = transformString;
  node.style.width = `${frame.width}px`;
  node.style.height = `${frame.height}px`;
  if (properties) {
    if (properties.backgroundColor) {
      node.style.backgroundColor = properties.backgroundColor;
    }
    if (typeof properties.opacity !== 'undefined') {
      node.style.opacity = `${properties.opacity}`;
    }
    if (typeof properties.borderRadius !== 'undefined') {
      node.style.borderRadius = `${properties.borderRadius}px`;
    }
    if (properties.shadowColor) {
      node.style.boxShadow = `${properties.shadowX || 0}px ${properties.shadowY || 0}px ${properties.shadowBlur || 0}px ${properties.shadowSpread || 0}px ${properties.shadowColor}`;
    }
  }
}

export function areFramesSame(a: Rect, b: Rect) {
  return (
    a.x === b.x &&
    a.y === b.y &&
    a.width === b.width &&
    a.height === b.height
  );
}
export function arePropertiesSame(a: ?AnimatedProperties, b: ?AnimatedProperties) {
  if (!a !== !b) {
    return false
  }
  if (!a || !b) {
    return true
  }
  return (
    a.backgroundColor === b.backgroundColor &&
    a.opacity === b.opacity &&
    a.rotation === b.rotation &&
    a.scaleX === b.scaleX &&
    a.scaleY === b.scaleY &&
    a.scale === b.scale &&
    a.borderRadius === b.borderRadius &&
    a.shadowX === b.shadowX &&
    a.shadowY === b.shadowY &&
    a.shadowBlur === b.shadowBlur &&
    a.shadowColor === b.shadowColor &&
    a.shadowSpread === b.shadowSpread
  );
}

function interp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}
export function interpolateFrame(from: Rect, to: Rect, t: number): Rect {
  return ['x', 'y', 'width', 'height'].reduce((hash, prop) => {
    if (from[prop] != null && to[prop] != null) {
      hash[prop] = interp(from[prop], to[prop], t);
    }
    return hash;
  }, { ...to });
}
export function interpolateProperties(from: AnimatedProperties, to: AnimatedProperties, t: number): AnimatedProperties {
  return ['opacity', 'rotation', 'scaleX', 'scaleY', 'scale', 'borderRadius', 'shadowX', 'shadowY', 'shadowBlur', 'shadowSpread'].reduce((hash, prop) => {
    if (from[prop] != null && to[prop] != null) {
      hash[prop] = interp(from[prop], to[prop], t);
    }
    return hash;
  }, { ...to });
}
