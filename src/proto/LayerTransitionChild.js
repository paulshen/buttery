/* @flow */
import React from 'react';

import Layer from './Layer';

export default class LayerTransitionChild extends React.Component {
  props: {
    frame: FrameType,
    enterFrame?: $Shape<FrameType>,
    exitFrame?: $Shape<FrameType>,
    style?: AnimatedProperties,
    enterStyle?: $Shape<AnimatedProperties>,
    exitStyle?: $Shape<AnimatedProperties>,
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
    let {
      enterFrame,
      frame,
      exitFrame,
      enterStyle,
      style,
      exitStyle,
      onEnter,
      onExit,
      ...props
    } = this.props;
    let f = frame;
    let s = style;
    switch (stage) {
    case 'entering':
      if (enterFrame) {
        f = { ...f, ...enterFrame };
      }
      if (enterStyle) {
        s = { ...s, ...enterStyle };
      }
      break;
    case 'exiting':
      if (exitFrame) {
        f = { ...f, ...exitFrame };
      }
      if (exitStyle) {
        s = { ...s, ...exitStyle };
      }
      break;
    case 'show':
    case 'shown':
      break;
    default:
      throw new Error('unexpected case');
    }
    return (
      <Layer
        {...props}
        frame={f}
        style={s}
        onAnimationEnd={this._onAnimationEnd}
      />
    );
  }
}
