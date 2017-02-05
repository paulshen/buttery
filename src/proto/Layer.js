/* @flow */
import React from 'react';
import Radium from 'radium';

import Animator from './Animator';

function interpolate(from, to, t) {
  return from + (to - from) * t;
}

class Layer extends React.Component {
  props: {
    animate?: boolean,
    height: number,
    width: number,
    x: number,
    y: number,
    children?: any,
    style?: any,
    onClick?: Function,
  }
  _layer: HTMLElement;
  _animator: ?Animator;
  _from: Object;
  _snap: Object;

  componentWillReceiveProps(nextProps) {
    let { x, y, width, height, animate } = nextProps;
    let changed = x !== this.props.x || y !== this.props.y || height !== this.props.height || width !== this.props.width;
    if (changed) {
      if (this._animator) {
        this._animator.stop();
      }
      if (animate) {
        this._from = this._snap || {
          height: this.props.height,
          width: this.props.width,
          x: this.props.x,
          y: this.props.y,
        };
        this._animator = new Animator(this._updater, 2000);
        this._animator.start();
      } else {
        this._layer.style.transform = `translate3d(${nextProps.x}px,${nextProps.y}px,0)`;
      }
    }
  }

  _updater = (t) => {
    let { x, y, width, height } = this.props;
    this._snap = {};
    if (this._from.x !== x || this._from.y !== y) {
      this._snap.x = interpolate(this._from.x, x, t);
      this._snap.y = interpolate(this._from.y, y, t);
      this._layer.style.transform = `translate3d(${this._snap.x}px,${this._snap.y}px,0)`;
    }
    if (this._from.width !== width) {
      this._snap.width = interpolate(this._from.width, width, t);
      this._layer.style.width = `${this._snap.width}px`;
    }
    if (this._from.height !== height) {
      this._snap.height = interpolate(this._from.height, height, t);
      this._layer.style.width = `${this._snap.height}px`;
    }
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let { children, height, width, x, y, style, onClick, ...props } = this.props;
    return (
      <div
        {...props}
        onClick={onClick}
        ref={c => this._layer = c}
        style={[Styles.Layer, {
          height: `${height}px`,
          width: `${width}px`,
          transform: `translate3d(${x}px,${y}px,0)`,
        }, style]}>
        {children}
      </div>
    );
  }
}
export default Radium(Layer);

const Styles = {
  Layer: {
    position: 'absolute',
  },
};
