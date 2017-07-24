/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import {
  DragConstraint,
  Layer,
  LayerTransitionChild,
  SpringAnimator,
  Frame
} from '../proto';

class App extends React.Component {
  state: {
    constraintY: DragConstraintType,
    scrollY: number,
    transitionAnimatedFrame: ?FrameType,
    transitionExit: boolean,
  } = {
    constraintY: DragConstraint({ min: 587 - 2000, max: 0, bounce: true }),
    scrollY: 0,
    transitionAnimatedFrame: null,
    transitionExit: false,
  };
  _scrollLayer: Layer;
  _transitionLayer: Layer;

  _onDragEnd = (p: Point) => {
    this.setState({ scrollY: p.y });
  };

  _onClick = () => {
    if (this.state.transitionAnimatedFrame) {
      this.setState({
        transitionExit: true,
      });
    } else {
      let frame = this._transitionLayer.getComputedFrame();
      let scrollFrame = this._scrollLayer.getComputedFrame();
      frame.x += scrollFrame.x;
      frame.y += scrollFrame.y;
      this.setState({
        transitionAnimatedFrame: frame,
      });
    }
  };

  _onExit = () => {
    this.setState({
      transitionAnimatedFrame: null,
      transitionExit: false,
    });
  };

  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            frame={Frame(0, this.state.scrollY, 375, 2000)}
            draggable={
              !this.state.transitionAnimatedFrame && !this.state.transitionExit
            }
            draggableProperties={{
              constraintX: DragConstraint({ min: 0, max: 0 }),
              constraintY: this.state.constraintY,
              momentum: true,
            }}
            onDragEnd={this._onDragEnd}
            animator={SpringAnimator({ spring: 0.0001, friction: 0.02 })}
            ref={c => (this._scrollLayer = c)}
          >
            <Layer
              frame={Frame(0, 0, 375, 300)}
              properties={{
                backgroundColor: `rgb(255,153,153)`,
              }}
            />
            <Layer
              frame={Frame(0, 300, 375, 300)}
              properties={{
                alignItems: 'center',
                backgroundColor: `rgb(200,153,153)`,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div>Hello!</div>
            </Layer>
            {!this.state.transitionAnimatedFrame &&
              <Layer
                frame={Frame(0, 600, 375, 300)}
                properties={{
                  backgroundColor: 'blue',
                }}
                onClick={this._onClick}
                ref={c => (this._transitionLayer = c)}
              />}
            <Layer
              frame={Frame(0, 900, 375, 300)}
              properties={{
                backgroundColor: `rgb(153,153,200)`,
              }}
            />
            <Layer
              frame={Frame(0, 1200, 375, 300)}
              properties={{
                backgroundColor: `rgb(153,200,153)`,
              }}
            />
          </Layer>
          <ReactTransitionGroup>
            {this.state.transitionAnimatedFrame &&
              !this.state.transitionExit &&
              <LayerTransitionChild
                enterFrame={this.state.transitionAnimatedFrame}
                frame={{
                  ...this.state.transitionAnimatedFrame,
                  y: 0,
                  height: 200,
                }}
                exitFrame={this.state.transitionAnimatedFrame}
                properties={{
                  backgroundColor: 'red',
                }}
                animator={SpringAnimator()}
                onClick={this._onClick}
                onExit={this._onExit}
              />}
          </ReactTransitionGroup>
        </div>
      </div>
    );
  }
}
export default Radium(App);

const Styles = {
  Root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
  },
  Chrome: {
    border: '1px solid #cccccc',
    height: '667px',
    width: '375px',
  },
};
