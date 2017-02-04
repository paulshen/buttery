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
  }

  render() {
    let { children, height, width, x, y, style } = this.props;
    return (
      <div style={[Styles.Layer, {
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
