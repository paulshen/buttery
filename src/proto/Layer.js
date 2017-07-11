/* @flow */
import React from 'react';

import { applyProperties, areFramesSame, arePropertiesSame } from './AnimatedProperties';
import Draggable from './Draggable';

export default class Layer extends React.Component {
  props: {
    frame: Frame,
    properties?: AnimatedProperties,
    animator?: Object,
    draggable?: boolean,
    draggableProperties?: $PropertyType<Draggable, 'props'>,
    children?: any,
    style?: any,
    onClick?: Function,
    onMove?: (p: Point) => void,
    onAnimationEnd?: () => void,
    onDrag?: (p: Point) => void,
    onDragEnd?: (p: Point) => void,
  };
  _layer: HTMLElement;
  _frame: Frame;
  _properties: ?AnimatedProperties;
  _animator: ?Object;
  _draggable: ?Draggable;

  constructor(props: $PropertyType<Layer, 'props'>) {
    super();
    this._frame = { ...props.frame };
    this._properties = { ...props.properties };
  }

  getFrame = () => ({
    ...this._frame,
  });

  getProperties = () => ({
    ...this._properties,
  });

  componentDidMount() {
    this._apply(this.props.frame, this.props.properties);
    if (this.props.draggable) {
      this._createDraggable(this.props);
    }
  }

  componentWillReceiveProps(nextProps: $PropertyType<Layer, 'props'>) {
    let { animator, frame, properties, draggable } = nextProps;
    if (!areFramesSame(frame, this.props.frame) || !arePropertiesSame(properties, this.props.properties)) {
      this._handlePropertiesChange(frame, properties, animator);
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
    }
  }

  _handlePropertiesChange = (
    frame: Frame,
    properties: ?AnimatedProperties,
    animator: ?Object
  ) => {
    if (this._animator) {
      this._animator.stop();
    }
    if (animator) {
      let nextAnimator;
      if (this._animator && this._animator.key === animator.key) {
        nextAnimator = this._animator;
      } else {
        nextAnimator = new animator.Klass(animator.props);
      }
      nextAnimator.start(
        this._frame || this.props.frame,
        this._properties || this.props.properties,
        frame,
        properties,
        this._apply,
        this._onAnimationEnd
      );
      this._animator = nextAnimator;
    } else {
      this._apply(frame, properties);
    }
  };

  _createDraggable = (props: $PropertyType<Layer, 'props'>) => {
    let { frame, draggableProperties } = props;
    this._draggable = new Draggable();
    this._draggable.props = draggableProperties;
    this._draggable.start(
      this._layer,
      frame,
      this._onDragStart,
      this._dragUpdater,
      this._onDragEnd
    );
  };

  _onDragStart = () => {
    if (this._animator) {
      this._animator.stop();
    }
  };

  _dragUpdater = (p: Point) => {
    if (this._draggable && this._draggable.isControlledByDraggable) {
      this._apply({ ...this._frame, ...p }, this._properties);
      this.props.onDrag && this.props.onDrag(p);
    }
  };

  _apply = (frame: Frame, properties: ?AnimatedProperties) => {
    let prevPosition = {
      x: this._frame.x,
      y: this._frame.y,
    };
    applyProperties(this._layer, frame, properties);
    this._frame = frame;
    this._properties = properties;
    if (this._draggable && !this._draggable.isControlledByDraggable) {
      this._draggable.setPoint(frame);
    }
    if (
      this.props.onMove &&
      (frame.x !== prevPosition.x || frame.y !== prevPosition.y)
    ) {
      this.props.onMove(frame);
    }
  };

  _onAnimationEnd = () => {
    this.props.onAnimationEnd && this.props.onAnimationEnd();
  };

  _onDragEnd = (p: Point) => {
    this.props.onDragEnd && this.props.onDragEnd(p);
    this._handlePropertiesChange(this.props.frame, this.props.properties, this.props.animator);
  };

  shouldComponentUpdate(nextProps: $PropertyType<Layer, 'props'>) {
    return (
      nextProps.style ||
      this.props.style ||
      React.Children.count(nextProps.children) > 0 ||
      React.Children.count(this.props.children) > 0
    );
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
    let {
      children,
      animator,
      frame,
      properties,
      draggable,
      draggableProperties,
      style,
      onMove,
      onDrag,
      onDragEnd,
      ...props
    } = this.props;
    return (
      <div
        {...props}
        ref={c => (this._layer = c)}
        style={style ? { ...Styles.Layer, ...style } : Styles.Layer}
      >
        {children}
      </div>
    );
  }
}

const Styles = {
  Layer: {
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
  },
};
