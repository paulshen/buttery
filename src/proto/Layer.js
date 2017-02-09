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
    onDrag?: (p: Point) => void,
    onDragEnd?: (p: Point) => void,
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
      this._handlePropertiesChange(properties, animator);
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
      this._draggable.props = nextProps.draggableProperties;
      this._draggable.layerProperties = properties;
    }
  }

  _handlePropertiesChange = (properties, animator) => {
    if (this._animator) {
      this._animator.stop();
    }
    if (animator) {
      animator.start(this._properties || this.props.properties, properties, this._updater, this._onAnimationEnd);
      this._animator = animator;
    } else {
      this._applyProperties(properties);
    }
  };

  _createDraggable = (props) => {
    let { properties, draggableProperties } = props;
    this._pointFromDraggable = { x: properties.x, y: properties.y };
    this._draggable = new Draggable();
    this._draggable.props = draggableProperties;
    this._draggable.layerProperties = properties;
    this._draggable.start(this._layer, this._pointFromDraggable, this._onDragStart, this._dragUpdater, this._onDragEnd);
  };

  _updater = (properties: LayerProperties) => {
    this._properties = properties;
    this._applyProperties(properties);
  };

  _onDragStart = () => {
    if (this._animator) {
      this._animator.stop();
    }
  };

  _dragUpdater = (p: Point) => {
    this._pointFromDraggable = p;
    this._applyProperties(this.props.properties);
    this.props && this.props.onDrag && this.props.onDrag(p);
  };

  _applyProperties = (properties) => {
    if (this._draggable) {
      if (this._draggable.isDragging) {
        properties = {
          ...properties,
          ...this._pointFromDraggable,
        };
      } else {
        this._draggable.setPoint({ x: properties.x, y: properties.y });
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

  _onDragEnd = (p: Point) => {
    this._properties = {
      ...this._properties,
      ...p,
    };
    this.props.onDragEnd && this.props.onDragEnd(p);
    this._handlePropertiesChange(this.props.properties, this.props.animator);
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
    let { children, animator, properties, draggable, draggableProperties, style, onClick, onMove, onDrag, onDragEnd, ...props } = this.props;
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
