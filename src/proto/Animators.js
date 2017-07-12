/* @flow */
import type Layer from './Layer';
import TimedAnimator from './animators/TimedAnimator';
import SpringAnimator from './animators/SpringAnimator';

let animators: { [layerID: string]: { [key: string]: Animator } } = {};

export function getAnimator(layer: Layer, key: string): ?Animator {
  let layerID = layer.getID();
  return animators[layerID] && animators[layerID][key];
}

export function createAnimator(
  layer: Layer,
  key: string,
  config: TimedAnimatorConfig | SpringAnimatorConfig
): Animator {
  let layerID = layer.getID();
  if (!animators[layerID]) {
    animators[layerID] = {};
  }
  if (animators[layerID][key]) {
    animators[layerID][key].stop();
  }
  if (config.type === 'timed') {
    animators[layerID][key] = new TimedAnimator(layer, key, config);
  }
  if (config.type === 'spring') {
    animators[layerID][key] = new SpringAnimator(layer, key, config);
  }
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
