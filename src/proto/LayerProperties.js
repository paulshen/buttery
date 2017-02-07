/* @flow */

export function applyProperties(node: HTMLElement, properties: LayerProperties) {
  node.style.transform = `translate3d(${properties.x}px,${properties.y}px,0)`;
  node.style.width = `${properties.width}px`;
  node.style.height = `${properties.height}px`;
  if (properties.backgroundColor) {
    node.style.backgroundColor = properties.backgroundColor;
  }
  if (typeof properties.opacity !== 'undefined') {
    node.style.opacity = `${properties.opacity}`;
  }
}

export function arePropertiesSame(a: LayerProperties, b: LayerProperties) {
  return (
    a.x === b.x &&
    a.y === b.y &&
    a.width === b.width &&
    a.height === b.height &&
    a.backgroundColor === b.backgroundColor &&
    a.opacity === b.opacity
  );
}

function interp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}
export function interpolateProperties(from: LayerProperties, to: LayerProperties, t: number): LayerProperties {
  return ['x', 'y', 'width', 'height', 'opacity'].reduce((hash, prop) => {
    if (typeof from[prop] !== 'undefined' && typeof to[prop] !== 'undefined') {
      hash[prop] = interp(from[prop], to[prop], t);
    }
    return hash;
  }, { ...to });
}
