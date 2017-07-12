/* @flow */

const Config = {
  duration: 300,
};

export default function Animated(value: ScalarValue) {
  return {
    value,
    config: Config,
    type: 'animated',
  };
}
