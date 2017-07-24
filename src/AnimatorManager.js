/* @flow */
import type Layer from './Layer';
import Animator from './Animator';

let animators: { [layerID: string]: { [key: string]: Animator } } = {};

export function getAnimator(layer: Layer, key: string): ?Animator {
  let layerID = layer.getID();
  return animators[layerID] && animators[layerID][key];
}

export function createAnimator(
  layer: Layer,
  key: string,
  config: AnimatorConfig
): Animator {
  let layerID = layer.getID();
  if (!animators[layerID]) {
    animators[layerID] = {};
  }
  if (animators[layerID][key]) {
    animators[layerID][key].stop();
  }
  animators[layerID][key] = new Animator(layer, key, config);
  return animators[layerID][key];
}

export function removeAnimator(layer: Layer, key: string) {
  let layerID = layer.getID();
  if (animators[layerID] && animators[layerID][key]) {
    animators[layerID][key].stop();
    delete animators[layerID][key];
  }
}

export function removeAnimatorsForLayer(layer: Layer) {
  let layerID = layer.getID();
  if (animators[layerID]) {
    Object.keys(animators[layerID]).forEach(key => {
      animators[layerID][key] && animators[layerID][key].stop();
    });
    delete animators[layerID];
  }
}
