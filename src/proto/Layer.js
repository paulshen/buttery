/* @flow */
import React from 'react';

import {
  applyProperties,
  areFramesSame,
  arePropertiesSame
} from './AnimatedProperties';
import { isFrameDraggable } from './Frame';
import Draggable from './Draggable';

export default class Layer extends React.Component {
  props: {
    frame: Frame,
    properties?: AnimatedProperties,
    animator?: Object,
    draggable?: boolean,
    draggableProperties?: $PropertyType<Draggable, 'props'>,
    children?: any,
    onClick?: Function,
    onMove?: (p: Point) => void,
    onAnimationEnd?: () => void,
    onDrag?: (p: Point) => void,
    onDragEnd?: (p: Point) => void,
  };
  _layer: HTMLElement;
  _computedFrame: ComputedFrame;
  _properties: ?AnimatedProperties;
  _animator: ?Object;
  _draggable: ?Draggable;

  constructor(props: $PropertyType<Layer, 'props'>) {
    super();
    this._computedFrame = this._getComputedFrame(props.frame);
    this._properties = { ...props.properties };
  }

  getComputedFrame = () => ({
    ...this._computedFrame,
  });

  getProperties = () => ({
    ...this._properties,
  });

  componentDidMount() {
    let { frame, properties } = this.props;
    this._apply(this._getComputedFrame(frame), properties);
    if (isFrameDraggable(frame)) {
      this._createDraggable(this.props);
    }
  }

  componentWillReceiveProps(nextProps: $PropertyType<Layer, 'props'>) {
    let { animator, frame, properties, draggable } = nextProps;
    let nextComputedFrame = this._getComputedFrame(frame);
    if (
      !areFramesSame(
        nextComputedFrame,
        this._getComputedFrame(this.props.frame)
      ) ||
      !arePropertiesSame(properties, this.props.properties)
    ) {
      this._handlePropertiesChange(nextComputedFrame, properties, animator);
    }
    let isDraggable = isFrameDraggable(frame);
    if (isDraggable !== !!this._draggable) {
      if (isDraggable) {
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
    frame: ComputedFrame,
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
        this._computedFrame,
        this._properties,
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
      this._getComputedFrame(frame),
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
      this._apply({ ...this._computedFrame, ...p }, this._properties);
      this.props.onDrag && this.props.onDrag(p);
    }
  };

  _getComputedFrame = (frame: Frame) => {
    let x = frame.x;
    let y = frame.y;
    if (typeof x !== 'number') {
      if (this._draggable && this._draggable.isControlledByDraggable) {
        x = this._draggable.getPoint().x;
      } else {
        x = x.value;
      }
    }
    if (typeof y !== 'number') {
      if (this._draggable && this._draggable.isControlledByDraggable) {
        y = this._draggable.getPoint().y;
      } else {
        y = y.value;
      }
    }
    return { x, y, width: frame.width, height: frame.height };
  };

  _apply = (frame: ComputedFrame, properties: ?AnimatedProperties) => {
    let prevPosition = {
      x: this._computedFrame.x,
      y: this._computedFrame.y,
    };
    applyProperties(this._layer, frame, properties);
    this._computedFrame = frame;
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
    this._handlePropertiesChange(
      this._getComputedFrame(this.props.frame),
      this.props.properties,
      this.props.animator
    );
  };

  shouldComponentUpdate(nextProps: $PropertyType<Layer, 'props'>) {
    return (
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
      onMove,
      onDrag,
      onDragEnd,
      ...props
    } = this.props;
    return (
      <div {...props} ref={c => (this._layer = c)} style={Styles.Layer}>
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
