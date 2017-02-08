/* @flow */
import React from 'react';

import Layer from './Layer';

export default class LayerTransitionChild extends React.Component {
  props: {
    properties: LayerProperties,
    enterProperties: LayerProperties,
    exitProperties: LayerProperties,
    animator?: Object,
  }

  state: {
    stage: 'entering' | 'show' | 'exiting',
  } = {
    stage: 'entering',
  };
  _exitCallback: ?Function;

  componentWillEnter(callback: Function) {
    this.setState({
      stage: 'show',
    });
    callback();
  }

  componentWillLeave(callback: Function) {
    this.setState({
      stage: 'exiting',
    });
    this._exitCallback = callback;
  }

  _onAnimationEnd = () => {
    this._exitCallback && this._exitCallback();
    this._exitCallback = null;
  };

  render() {
    let { stage } = this.state;
    let { enterProperties, properties, exitProperties, ...props } = this.props;
    let p;
    switch (stage) {
    case 'entering':
      p = enterProperties;
      break;
    case 'show':
      p = properties;
      break;
    case 'exiting':
      p = exitProperties;
      break;
    }
    return (
      <Layer
        {...props}
        properties={p}
        onAnimationEnd={this._onAnimationEnd}
      />
    );
  }
}
