/* @flow */
import React from 'react';
import Radium from 'radium';

class Layer extends React.Component {
  props: {
    height: number,
    width: number,
    x: number,
    y: number,
    children?: any,
    style?: any,
    onClick?: Function,
  }
  _layer: HTMLElement;

  componentWillReceiveProps(nextProps) {
    let { x, y, width, height } = nextProps;
    if (x !== this.props.x || y !== this.props.y) {
      this._layer.style.transform = `translate3d(${x}px,${y}px,0)`;
    }
    if (height !== this.props.height) {
      this._layer.style.height = `${height}px`;
    }
    if (width !== this.props.width) {
      this._layer.style.width = `${width}px`;
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let { children, height, width, x, y, style, onClick } = this.props;
    return (
      <div
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
