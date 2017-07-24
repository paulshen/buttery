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
    onDragRelease?: (p: Point) => void,
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
    let updates = this._getTargetValues(frame);
    if (style) {
      updates = {
        ...updates,
        ...this._getTargetValues(style),
      }
    }
    this._applyUpdates(updates);
    this._updateDraggable(frame);
  }

  componentWillReceiveProps(nextProps: $PropertyType<Layer, 'props'>) {
    let { animator, frame, style } = nextProps;
    this._updateDraggable(frame);
    let nextValues = this._getTargetValues(frame);
    if (style) {
      nextValues = {
        ...nextValues,
        ...this._getTargetValues(style),
      };
    }
    let prevValues = this._getTargetValues(this.props.frame);
    if (this.props.style) {
      prevValues = {
        ...prevValues,
        ...this._getTargetValues(this.props.style),
      };
    }
    let differingProperties = getDifferingProperties(
      nextValues,
      prevValues
    );
    if ( differingProperties.length > 0 ) {
      let updates = {};
      differingProperties.forEach(property => {
        let value;
        if (frame.hasOwnProperty(property)) {
          value = frame[property];
        } else {
          value = style && style[property];
        }
        this._handleTargetPropertyChange(
          updates,
          property,
          this._computedStyles[property],
          value
        )
      });
      this._applyUpdates(updates);
    }
  }

  /**
   * Resolve values to target scalars (e.g. Animated and Drag)
   * "Target" may not be the live value (e.g. in middle of drag or animation)
   */
  _getTargetValues = (obj: Object): Object =>
    Object.keys(obj).reduce((acc, key) => {
      acc[key] = getTargetValue(obj[key]);
      return acc;
    }, {});

  /**
   * Updates the passed updates map for given property and from/to values.
   * Should be called by properties that have changed target value.
   */
  _handleTargetPropertyChange = (
    updates: Object,
    property: string,
    fromScalar: ?(ScalarValue | any),
    to: InputValue | DragValue | any
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
          property,
          fromScalar,
          to.value
        );
      }
    } else {
      removeAnimator(this, property);
      updates[property] = to;
    }
  };

  /**
   * Applies updates to DOM and handles if point changed
   */
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
        this._onDragRelease,
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

  _onDragRelease = (p: Point) => {
    this.props.onDragRelease && this.props.onDragRelease(p);
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
      'x',
      this._computedStyles.x,
      this.props.frame.x
    );
    this._handleTargetPropertyChange(
      updates,
      'y',
      this._computedStyles.y,
      this.props.frame.y
    );
    this._applyUpdates(updates);
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
      onDragRelease,
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
