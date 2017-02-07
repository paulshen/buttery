/* @flow */
import React from 'react';
import Radium from 'radium';

import { applyProperties, arePropertiesSame, interpolateProperties } from './LayerProperties';

function interpolate(from, to, t) {
  return from + (to - from) * t;
}

export function getChildrenDimensions(children: any): ?Rect {
  let bound;
  React.Children.forEach(children, (child) => {
    if (!bound) {
      bound = {
        x: child.props.properties.x,
        y: child.props.properties.y,
        x2: child.props.properties.x + child.props.properties.width,
        y2: child.props.properties.y + child.props.properties.height,
      };
    } else {
      bound = {
        x: Math.min(bound.x, child.props.properties.x),
        y: Math.min(bound.y, child.props.properties.y),
        x2: Math.max(bound.x2, child.props.properties.x + child.props.properties.width),
        y2: Math.max(bound.y2, child.props.properties.y + child.props.properties.height),
      };
    }
  });
  return bound && {
    x: bound.x,
    y: bound.y,
    width: bound.x2 - bound.x,
    height: bound.y2 - bound.y,
  };
}

class Layer extends React.Component {
  props: {
    properties: LayerProperties,
    animator?: Object,
    children?: any,
    style?: any,
    onClick?: Function,
    onMove?: (p: Point) => void,
  }
  _layer: HTMLElement;
  _properties: LayerProperties;
  _animator: ?Object;
  _from: Object;
  _properties: Object;

  constructor(props) {
    super();
    this._properties = { ...props.properties };
  }

  componentDidMount() {
    applyProperties(this._layer, this.props.properties);
  }

  componentWillReceiveProps(nextProps) {
    let { animator, properties } = nextProps;
    if (!arePropertiesSame(properties, this.props.properties)) {
      if (this._animator) {
        this._animator.stop();
      }
      if (animator) {
        this._from = this._properties || { ...properties };
        animator.start(this._updater);
        this._animator = animator;
      } else {
        applyProperties(this._layer, properties);
        if (this.props.onMove) {
          this.props.onMove(properties);
        }
      }
    }
  }

  _updater = (t) => {
    this._properties = interpolateProperties(this._from, this.props.properties, t);
    applyProperties(this._layer, this._properties);
  };

  shouldComponentUpdate(nextProps) {
    return React.Children.count(nextProps.children) > 0 || React.Children.count(this.props.children) > 0;
  }

  componentWillUnmount() {
    if (this._animator) {
      this._animator.stop();
    }
  }

  render() {
    let { children, animator, properties, style, onClick, ...props } = this.props;
    return (
      <div
        {...props}
        onClick={onClick}
        ref={c => this._layer = c}
        style={[Styles.Layer, style]}>
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
