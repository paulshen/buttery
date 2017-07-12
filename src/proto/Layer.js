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
import { getAnimator, createAnimator } from './Animators';
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
  _updates: Updates;

  constructor(props: $PropertyType<Layer, 'props'>) {
    super();
    this._computedFrame = this._getTargetValues(props.frame);
    this._computedStyles = props.properties
      ? this._getTargetValues(props.properties)
      : {};
    // this._computedFrame = this._getComputedFrame(props.frame);
    // this._properties = { ...props.properties };
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

  // getProperties = () => ({
  //   ...this._properties,
  // });
  //
  componentDidMount() {
    let { frame, properties } = this.props;
    this._applyUpdates(this._computedFrame);
    this._applyUpdates(this._computedStyles);
    if (
      (typeof frame.x === 'object' && frame.x.type === 'drag') ||
      (typeof frame.y === 'object' && frame.y.type === 'drag')
    ) {
      this._createDraggable();
    }
    // this._apply(this._getComputedFrame(frame), properties);
  }

  componentWillReceiveProps(nextProps: $PropertyType<Layer, 'props'>) {
    let { animator, frame, properties, draggable } = nextProps;
    let nextTargetFrame = this._getTargetValues(frame);
    let differingFrameProperties = getDifferingProperties(
      this._getTargetValues(frame),
      this._getTargetValues(this.props.frame)
    );
    let differingStyleProperties = getDifferingProperties(
      this._getTargetValues(properties),
      this._getTargetValues(this.props.properties)
    );
    if (
      differingFrameProperties.length > 0 ||
      differingStyleProperties.length > 0
    ) {
      this._updates = {};
      differingFrameProperties.forEach(property =>
        this._handleTargetPropertyChange(
          frame[property],
          this._computedFrame[property],
          property
        )
      );
      differingStyleProperties.forEach(property =>
        this._handleTargetPropertyChange(
          properties[property],
          this._computedStyles[property],
          property
        )
      );
      this._applyUpdates(this._updates);
    }
    // if (
    //   !areFramesSame(
    //     nextTargetFrame,
    //     this._getTargetFrame(this.props.frame)
    //   ) ||
    //   !arePropertiesSame(properties, this.props.properties)
    // ) {
    //   this._handlePropertiesChange(frame, properties);
    // }
  }

  _handleTargetPropertyChange = (
    to: InputValue | DragValue | any,
    from: ?(ScalarValue | any),
    property: string
  ) => {
    if (typeof to === 'object') {
      if (to.type === 'animated') {
        if (from == null) {
          this._updates[property] = to.value;
        } else {
          // TODO: reuse previous animator if same config?
          let animator = createAnimator(this, property, to.config);
          animator.start(from, to.value, value => {
            this._applyUpdates({
              [property]: value,
            });
          });
        }
      } else if (to.type === 'drag') {
        if (!this._draggable) {
          this._createDraggable();
        }
        if (this._draggable && !this._draggable.isControlledByDraggable) {
          this._handleTargetPropertyChange(to.value, from, property);
        }
        // if (this._draggable) {
        //   this._draggable.props = nextProps.draggableProperties;
        // }
      }
    } else {
      this._updates[property] = to;
    }
  };

  // _handlePropertiesChange = (
  //   frame: FrameType,
  //   properties: ?AnimatedProperties,
  //   animator: ?Object
  // ) => {
  //   if (this._animator) {
  //     this._animator.stop();
  //   }
  //   if (animator) {
  //     let nextAnimator;
  //     if (this._animator && this._animator.key === animator.key) {
  //       nextAnimator = this._animator;
  //     } else {
  //       nextAnimator = new animator.Klass(animator.props);
  //     }
  //     nextAnimator.start(
  //       this._computedFrame,
  //       this._properties,
  //       frame,
  //       properties,
  //       this._apply,
  //       this._onAnimationEnd
  //     );
  //     this._animator = nextAnimator;
  //   } else {
  //     this._apply(frame, properties);
  //   }
  // };
  //
  _createDraggable = () => {
    this._draggable = new Draggable();
    // this._draggable.props = draggableProperties;
    this._draggable.start(
      this._layer,
      this._computedFrame,
      this._onDragStart,
      this._dragUpdater,
      this._onDragEnd
    );
  };

  _onDragStart = () => {
    let xAnimator = getAnimator(this, 'x');
    xAnimator && xAnimator.stop();
    let yAnimator = getAnimator(this, 'y');
    yAnimator && yAnimator.stop();
  };

  _dragUpdater = (p: Point) => {
    if (this._draggable && this._draggable.isControlledByDraggable) {
      // TODO: only pass updates
      this._applyUpdates({
        x: p.x,
        y: p.y,
      });
      this.props.onDrag && this.props.onDrag(p);
    }
  };

  // _getTargetFrame = (frame: FrameType): ComputedFrameType => ({
  //   x: getTargetValue(frame.x),
  //   y: getTargetValue(frame.y),
  //   width: getTargetValue(frame.width),
  //   height: getTargetValue(frame.height),
  // });

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
      if (this._draggable && this._draggable.isControlledByDraggable) {
        return this._draggable.getPoint()[key];
      }
      return this._getValue(value.value, key);
    }
    throw new Error('unknown value type');
  };

  _applyUpdates = (updates: Updates) => {
    let styleUpdates = {};
    if (typeof updates.x !== 'undefined' || typeof updates.y !== 'undefined') {
      let x = updates.x || this._computedFrame.x;
      let y = updates.y || this._computedFrame.y;
      let transformString = `translate3d(${x}px,${y}px,0)`;
      styleUpdates.transform = transformString;
      this._computedFrame.x = x;
      this._computedFrame.y = y;
      if (this._draggable && !this._draggable.isControlledByDraggable) {
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

  // _apply = (frame: ComputedFrameType, properties: ?AnimatedProperties) => {
  //   let prevPosition = {
  //     x: this._computedFrame.x,
  //     y: this._computedFrame.y,
  //   };
  //   applyProperties(this._layer, frame, properties);
  //   this._computedFrame = frame;
  //   this._properties = properties;
  //   if (this._draggable && !this._draggable.isControlledByDraggable) {
  //     this._draggable.setPoint(frame);
  //   }
  //   if (
  //     this.props.onMove &&
  //     (frame.x !== prevPosition.x || frame.y !== prevPosition.y)
  //   ) {
  //     this.props.onMove(frame);
  //   }
  // };
  //
  _onAnimationEnd = () => {
    this.props.onAnimationEnd && this.props.onAnimationEnd();
  };

  _onDragEnd = (p: Point) => {
    this._updates = {};
    // TODO: get animated value out of drag
    this._handleTargetPropertyChange(
      this.props.frame.x,
      this._computedFrame.x,
      'x'
    );
    this._handleTargetPropertyChange(
      this.props.frame.y,
      this._computedFrame.y,
      'y'
    );
    this._applyUpdates(this._updates);
    this.props.onDragEnd && this.props.onDragEnd(p);
    // this._handlePropertiesChange(
    //   this._getComputedFrame(this.props.frame),
    //   this.props.properties,
    //   this.props.animator
    // );
  };

  shouldComponentUpdate(nextProps: $PropertyType<Layer, 'props'>) {
    return (
      React.Children.count(nextProps.children) > 0 ||
      React.Children.count(this.props.children) > 0
    );
  }

  componentWillUnmount() {
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
