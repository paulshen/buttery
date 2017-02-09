/* @flow */
import React from 'react';

import Layer from './Layer';

export default class LayerTransitionChild extends React.Component {
  props: {
    properties: LayerProperties,
    enterProperties: LayerProperties,
    exitProperties: LayerProperties,
    draggable?: boolean,
    animator?: Object,
    onEnter?: Function,
  };
  state: {
    stage: 'entering' | 'show' | 'shown' | 'exiting',
  } = {
    stage: 'entering',
  };
  _enterCallback: ?Function;
  _exitCallback: ?Function;

  componentWillEnter(callback: Function) {
    this.setState({
      stage: 'show',
    });
    this._enterCallback = callback;
  }

  componentDidEnter() {
    if (this.state.stage === 'exiting') {
      return;
    }
    this.setState({
      stage: 'shown',
    });
    this.props.onEnter && this.props.onEnter();
  }

  componentWillLeave(callback: Function) {
    this._enterCallback = null;
    this.setState({
      stage: 'exiting',
    });
    this._exitCallback = callback;
  }

  _onAnimationEnd = () => {
    let { stage } = this.state;
    if (stage === 'show' && this._enterCallback) {
      this._enterCallback();
      this._enterCallback = null;
    // This else is important - the above `this._enterCallback()` will continue
    // execution here after `componentWillLeave`
    } else if (stage === 'exiting' && this._exitCallback) {
      this._exitCallback();
      this._exitCallback = null;
    }
  };

  render() {
    let { stage } = this.state;
    let { enterProperties, properties, exitProperties, onEnter, draggable, ...props } = this.props;
    let p;
    switch (stage) {
    case 'entering':
      p = enterProperties;
      break;
    case 'show':
    case 'shown':
      p = properties;
      break;
    case 'exiting':
      p = exitProperties;
      break;
    }
    if (stage !== 'shown') {
      draggable = false;
    }
    return (
      <Layer
        {...props}
        properties={p}
        draggable={draggable}
        onAnimationEnd={this._onAnimationEnd}
      />
    );
  }
}
