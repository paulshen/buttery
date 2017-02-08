/* @flow */
import React from 'react';
import Radium from 'radium';

import { applyProperties, arePropertiesSame, interpolateProperties } from './LayerProperties';
import Draggable from './Draggable';

class Layer extends React.Component {
  props: {
    properties: LayerProperties,
    animator?: Object,
    draggable?: boolean,
    draggableProperties?: $PropertyType<Draggable, 'props'>;
    children?: any,
    style?: any,
    onClick?: Function,
    onMove?: (p: Point) => void,
    onAnimationEnd?: () => void,
  }
  _layer: HTMLElement;
  _properties: LayerProperties;
  _animator: ?Object;
  _pointFromDraggable: ?Point;
  _draggable: ?Draggable;

  constructor(props) {
    super();
    this._properties = { ...props.properties };
  }

  componentDidMount() {
    this._applyProperties(this.props.properties);
    if (this.props.draggable) {
      this._createDraggable(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { animator, properties, draggable } = nextProps;
    if (!arePropertiesSame(properties, this.props.properties)) {
      if (this._animator) {
        this._animator.stop();
      }
      if (animator) {
        animator.start(this._properties || this.props.properties, properties, this._updater, this._onAnimationEnd);
        this._animator = animator;
      } else {
        this._applyProperties(properties);
      }
    }
    if (draggable !== this.props.draggable) {
      if (draggable) {
        this._createDraggable(nextProps);
      } else if (this._draggable) {
        this._draggable.stop();
        this._draggable = null;
      }
    }
    if (this._draggable) {
      // $FlowAssert
      this._draggable.props = nextProps.draggableProperties;
      this._draggable.layerProperties = properties;
    }
  }

  _createDraggable = (props) => {
    let { properties, draggableProperties } = props;
    this._pointFromDraggable = { x: properties.x, y: properties.y };
    this._draggable = new Draggable();
    // TODO: draggable={true} requires draggableProperties
    // $FlowAssert
    this._draggable.props = draggableProperties;
    this._draggable.layerProperties = properties;
    this._draggable.start(this._layer, this._pointFromDraggable, this._pointUpdater);
  };

  _updater = (properties: LayerProperties) => {
    this._properties = properties;
    this._applyProperties(properties);
  };

  _pointUpdater = (p: Point) => {
    this._pointFromDraggable = p;
    this._applyProperties(this.props.properties);
  };

  _applyProperties = (properties) => {
    if (this._draggable) {
      properties = {
        ...properties,
        ...this._pointFromDraggable,
      }
    }
    applyProperties(this._layer, properties);
    if (this.props.onMove) {
      this.props.onMove(properties);
    }
  };

  _onAnimationEnd = () => {
    this.props.onAnimationEnd && this.props.onAnimationEnd();
  };

  shouldComponentUpdate(nextProps) {
    return React.Children.count(nextProps.children) > 0 || React.Children.count(this.props.children) > 0;
  }

  componentWillUnmount() {
    if (this._animator) {
      this._animator.stop();
    }
    if (this._draggable) {
      this._draggable.stop();
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
