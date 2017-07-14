/* @flow */
import React from 'react';

import {
  getTargetValue,
  getDifferingProperties,
  applyUpdates
} from './AnimatedProperties';
import {
  getAnimator,
  createAnimator,
  removeAnimator,
  removeAnimatorsForLayer
} from './AnimatorManager';
import Draggable from './Draggable';

let nextId = 100;
export default class Layer extends React.Component {
  props: {
    frame: FrameType,
    style?: AnimatedProperties,
    animator?: Object,
    children?: any,
    onClick?: Function,
    onMove?: (p: Point) => void,
    onAnimationEnd?: () => void,
    onDrag?: (p: Point) => void,
    onDragEnd?: (p: Point) => void,
  };
  _id: ?string;
  _layer: HTMLElement;
  _computedStyles: { [property: string]: any } = {};
  _animator: ?Object;
  _draggable: ?Draggable;

  getID = (): string => {
    if (!this._id) {
      this._id = `${nextId}`;
      nextId++;
    }
    return this._id;
  };

  getComputedStyles = () => ({
    ...this._computedStyles,
  });

  componentDidMount() {
    let { frame, style } = this.props;
    this._applyUpdates(this._getTargetValues(frame));
    style && this._applyUpdates(this._getTargetValues(style));
    this._updateDraggable(frame);
  }

  componentWillReceiveProps(nextProps: $PropertyType<Layer, 'props'>) {
    let { animator, frame, style } = nextProps;
    this._updateDraggable(frame);
    let nextTargetFrame = this._getTargetValues(frame);
    let differingFrameProperties = getDifferingProperties(
      this._getTargetValues(frame),
      this._getTargetValues(this.props.frame)
    );
    let differingStyleProperties = getDifferingProperties(
      this._getTargetValues(style || {}),
      this._getTargetValues(this.props.style || {})
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
          this._computedStyles[property],
          this.props.frame[property],
          property
        )
      );
      differingStyleProperties.forEach(property =>
        this._handleTargetPropertyChange(
          updates,
          style && style[property],
          this._computedStyles[property],
          this.props.style && this.props.style[property],
          property
        )
      );
      this._applyUpdates(updates);
    }
  }

  _handleTargetPropertyChange = (
    updates: Object,
    to: InputValue | DragValue | any,
    fromScalar: ?(ScalarValue | any),
    from: ?(InputValue | DragValue | any),
    property: string
  ) => {
    if (typeof to === 'object') {
      if (to.type === 'animated') {
        if (fromScalar == null) {
          updates[property] = to.value;
        } else {
          // TODO: reuse previous animator if same config?
          let animator = createAnimator(this, property, to.config);
          let { onEnd } = to;
          animator.start(
            fromScalar,
            to.value,
            value => {
              this._applyUpdates({
                [property]: value,
              });
            },
            () => this._onAnimationEnd(onEnd)
          );
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
        this._computedStyles,
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
    this._applyUpdates({
      x: p.x,
      y: p.y,
    });
    this.props.onDrag && this.props.onDrag(p);
  };

  _onDragEnd = (p: Point) => {
    if (this.props.onDragEnd) {
      this.props.onDragEnd(p);
      // this allows clients to modify props on before resetting
      window.requestAnimationFrame(this._resetPointAfterDrag);
    } else {
      this._resetPointAfterDrag();
    }
  };

  _resetPointAfterDrag = () => {
    let updates = {};
    this._handleTargetPropertyChange(
      updates,
      this.props.frame.x,
      this._computedStyles.x,
      null,
      'x'
    );
    this._handleTargetPropertyChange(
      updates,
      this.props.frame.y,
      this._computedStyles.y,
      null,
      'y'
    );
    this._applyUpdates(updates);
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

  _applyUpdates = (updates: Object) => {
    if (applyUpdates(this._layer, updates, this._computedStyles)) {
      let p = {
        x: this._computedStyles.x,
        y: this._computedStyles.y,
      }
      if (this._draggable && !this._draggable.isActive()) {
        this._draggable.setPoint(p);
      }
      this.props.onMove && this.props.onMove(p);
    }
  };

  _onAnimationEnd = (onEnd: ?Function) => {
    onEnd && onEnd();
    this.props.onAnimationEnd && this.props.onAnimationEnd();
  };

  shouldComponentUpdate(nextProps: $PropertyType<Layer, 'props'>) {
    return (
      React.Children.count(nextProps.children) > 0 ||
      React.Children.count(this.props.children) > 0
    );
  }

  componentWillUnmount() {
    removeAnimatorsForLayer(this);
    if (this._draggable) {
      this._draggable.stop();
    }
  }

  render() {
    let {
      children,
      animator,
      frame,
      style,
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
