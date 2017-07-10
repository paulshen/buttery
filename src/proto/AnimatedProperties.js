/* @flow */

export function applyProperties(node: HTMLElement, properties: AnimatedProperties) {
  let transformString = `translate3d(${properties.x}px,${properties.y}px,0)`;
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
  node.style.transform = transformString;
  node.style.width = `${properties.width}px`;
  node.style.height = `${properties.height}px`;
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

export function arePropertiesSame(a: AnimatedProperties, b: AnimatedProperties) {
  return (
    a.x === b.x &&
    a.y === b.y &&
    a.width === b.width &&
    a.height === b.height &&
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
export function interpolateProperties(from: AnimatedProperties, to: AnimatedProperties, t: number): AnimatedProperties {
  return ['x', 'y', 'width', 'height', 'opacity', 'rotation', 'scaleX', 'scaleY', 'scale', 'borderRadius', 'shadowX', 'shadowY', 'shadowBlur', 'shadowSpread'].reduce((hash, prop) => {
    if (from[prop] != null && to[prop] != null) {
      hash[prop] = interp(from[prop], to[prop], t);
    }
    return hash;
  }, { ...to });
}
