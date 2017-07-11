/* @flow */
import React from 'react';

import Layer from './Layer';

export default class LayerTransitionChild extends React.Component {
  props: {
    frame: FrameType,
    enterFrame?: FrameType,
    exitFrame?: FrameType,
    properties?: AnimatedProperties,
    enterProperties?: AnimatedProperties,
    exitProperties?: AnimatedProperties,
    draggable?: boolean,
    animator?: Object,
    onEnter?: Function,
    onExit?: Function,
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
      this.props.onExit && this.props.onExit();
    }
  };

  render() {
    let { stage } = this.state;
    let { enterFrame, frame, exitFrame, enterProperties, properties, exitProperties, onEnter, onExit, draggable, ...props } = this.props;
    let f;
    let p;
    switch (stage) {
    case 'show':
    case 'shown':
      f = frame;
      p = properties;
      break;
    case 'entering':
      f = enterFrame || frame;
      p = enterProperties || properties;
      break;
    case 'exiting':
      f = exitFrame || frame;
      p = exitProperties || properties;
      break;
    default:
      throw new Error('unexpected case');
    }
    if (stage !== 'shown') {
      draggable = false;
    }
    return (
      <Layer
        {...props}
        frame={f}
        properties={p}
        draggable={draggable}
        onAnimationEnd={this._onAnimationEnd}
      />
    );
  }
}
