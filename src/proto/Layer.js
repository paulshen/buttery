/* @flow */
import React from 'react';
import CSSPropertyOperations from 'react-dom/lib/CSSPropertyOperations';

import {
  applyProperties,
  areFramesSame,
  arePropertiesSame,
  getTargetValue,
  getDifferingProperties
} from './AnimatedProperties';
import { getAnimator, createAnimator, removeAnimator } from './Animators';
import Draggable from './Draggable';

type Updates = { [key: string]: ScalarValue };

let nextId = 100;
export default class Layer extends React.Component {
  props: {
    frame: FrameType,
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
  _id: ?string;
  _layer: HTMLElement;
  _computedFrame: ComputedFrameType;
  _computedStyles: { [property: string]: any };
  _animator: ?Object;
  _draggable: ?Draggable;

  constructor(props: $PropertyType<Layer, 'props'>) {
    super();
    this._computedFrame = this._getTargetValues(props.frame);
    this._computedStyles = props.properties
      ? this._getTargetValues(props.properties)
      : {};
  }

  getID = (): string => {
    if (!this._id) {
      this._id = `${nextId}`;
      nextId++;
    }
    return this._id;
  };

  getComputedFrame = () => ({
    ...this._computedFrame,
  });

  componentDidMount() {
    let { frame, properties } = this.props;
    this._applyUpdates(this._computedFrame);
    this._applyUpdates(this._computedStyles);
    this._updateDraggable(frame);
  }

  componentWillReceiveProps(nextProps: $PropertyType<Layer, 'props'>) {
    let { animator, frame, properties, draggable } = nextProps;
    this._updateDraggable(frame);
    let nextTargetFrame = this._getTargetValues(frame);
    let differingFrameProperties = getDifferingProperties(
      this._getTargetValues(frame),
      this._getTargetValues(this.props.frame)
    );
    let differingStyleProperties = getDifferingProperties(
      this._getTargetValues(properties || {}),
      this._getTargetValues(this.props.properties || {})
    );
    if (
      differingFrameProperties.length > 0 ||
      differingStyleProperties.length > 0
    ) {
      let updates = {};
      differingFrameProperties.forEach(property =>
        this._handleTargetPropertyChange(
          updates,
          frame[property],
          this._computedFrame[property],
          this.props.frame[property],
          property
        )
      );
      differingStyleProperties.forEach(property =>
        this._handleTargetPropertyChange(
          updates,
          properties && properties[property],
          this._computedStyles[property],
          this.props.properties && this.props.properties[property],
          property
        )
      );
      this._applyUpdates(updates);
    }
  }

  _handleTargetPropertyChange = (
    updates: Updates,
    to: InputValue | DragValue | any,
    fromScalar: ?(ScalarValue | any),
    from: ?(InputValue | DragValue | any),
    property: string
  ) => {
    // TODO: handle previous animate and drag values
    if (typeof to === 'object') {
      if (to.type === 'animated') {
        if (fromScalar == null) {
          updates[property] = to.value;
        } else {
          // TODO: reuse previous animator if same config?
          let animator = createAnimator(this, property, to.config);
          animator.start(fromScalar, to.value, value => {
            this._applyUpdates({
              [property]: value,
            });
          });
        }
      } else if (
        to.type === 'drag' &&
        (!this._draggable || !this._draggable.isActive())
      ) {
        this._handleTargetPropertyChange(
          updates,
          to.value,
          fromScalar,
          from,
          property
        );
      }
    } else {
      removeAnimator(this, property);
      updates[property] = to;
    }
  };

  _updateDraggable = (frame: FrameType) => {
    let { x, y } = frame;
    let isDragX = typeof x === 'object' && x.type === 'drag';
    let isDragY = typeof y === 'object' && y.type === 'drag';
    if (isDragX || isDragY) {
      let draggable = this._getDraggable();
      draggable.setConfig(
        'x',
        isDragX ? ((x: any): Object).config || {} : null
      );
      draggable.setConfig(
        'y',
        isDragY ? ((y: any): Object).config || {} : null
      );
    } else if (this._draggable) {
      this._draggable.stop();
      this._draggable = null;
    }
  };

  _getDraggable = () => {
    if (!this._draggable) {
      let draggable = new Draggable();
      draggable.start(
        this._layer,
        this._computedFrame,
        this._onDragStart,
        this._dragUpdater,
        this._onDragEnd
      );
      this._draggable = draggable;
    }
    return this._draggable;
  };

  _onDragStart = () => {
    removeAnimator(this, 'x');
    removeAnimator(this, 'y');
  };

  _dragUpdater = (p: Point) => {
    // TODO: only pass updates
    this._applyUpdates({
      x: p.x,
      y: p.y,
    });
    this.props.onDrag && this.props.onDrag(p);
  };

  _onDragEnd = (p: Point) => {
    let updates = {};
    this._handleTargetPropertyChange(
      updates,
      this.props.frame.x,
      this._computedFrame.x,
      null,
      'x'
    );
    this._handleTargetPropertyChange(
      updates,
      this.props.frame.y,
      this._computedFrame.y,
      null,
      'y'
    );
    this._applyUpdates(updates);
    this.props.onDragEnd && this.props.onDragEnd(p);
  };

  _getTargetValues = (obj: Object): Object =>
    Object.keys(obj).reduce((acc, key) => {
      acc[key] = getTargetValue(obj[key]);
      return acc;
    }, {});

  _getComputedFrame = (frame: FrameType): ComputedFrameType => ({
    x: this._getValue(frame.x, 'x'),
    y: this._getValue(frame.y, 'y'),
    width: this._getValue(frame.width, 'width'),
    height: this._getValue(frame.height, 'height'),
  });

  _getValue = (
    value: ScalarValue | AnimatedValue | DragValue,
    key: string
  ): ScalarValue => {
    if (typeof value === 'number') {
      return value;
    }
    if (value.type === 'animated') {
      let animator = getAnimator(this, key);
      if (animator) {
        return animator.getValue();
      }
      return value.value;
    }
    if (value.type === 'drag') {
      if (this._draggable && this._draggable.isActive()) {
        return this._draggable.getPoint()[key];
      }
      return this._getValue(value.value, key);
    }
    throw new Error('unknown value type');
  };

  _applyUpdates = (updates: Updates) => {
    let styleUpdates = {};
    if (typeof updates.x !== 'undefined' || typeof updates.y !== 'undefined') {
      // TODO: onMove
      let x = updates.x || this._computedFrame.x;
      let y = updates.y || this._computedFrame.y;
      let transformString = `translate3d(${x}px,${y}px,0)`;
      styleUpdates.transform = transformString;
      this._computedFrame.x = x;
      this._computedFrame.y = y;
      if (this._draggable && !this._draggable.isActive()) {
        this._draggable.setPoint({ x, y });
      }
    }
    if (typeof updates.width !== 'undefined') {
      styleUpdates.width = updates.width;
      this._computedFrame.width = updates.width;
    }
    if (typeof updates.height !== 'undefined') {
      styleUpdates.height = updates.height;
      this._computedFrame.height = updates.height;
    }
    // TODO: handle properties and random properties
    if (typeof updates.backgroundColor !== 'undefined') {
      styleUpdates.backgroundColor = updates.backgroundColor;
      this._computedStyles.backgroundColor = updates.backgroundColor;
    }
    CSSPropertyOperations.setValueForStyles(this._layer, styleUpdates, {
      _currentElement: {},
      _debugID: 'HACK',
    });
  };

  _onAnimationEnd = () => {
    this.props.onAnimationEnd && this.props.onAnimationEnd();
  };

  shouldComponentUpdate(nextProps: $PropertyType<Layer, 'props'>) {
    return (
      React.Children.count(nextProps.children) > 0 ||
      React.Children.count(this.props.children) > 0
    );
  }

  componentWillUnmount() {
    // TODO
    // if (this._animator) {
    //   this._animator.stop();
    // }
    // if (this._draggable) {
    //   this._draggable.stop();
    // }
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
