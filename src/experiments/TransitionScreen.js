/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import { DragConstraint, Layer, LayerTransitionChild, SpringAnimator } from '../proto';

class App extends React.Component {
  state: {
    constraintY: DragConstraintType,
    scrollY: number,
    transitionAnimatedProperties: ?AnimatedProperties,
    transitionExit: boolean,
  } = {
    constraintY: DragConstraint({ min: 587 - 2000, max: 0, bounce: true }),
    scrollY: 0,
    transitionAnimatedProperties: null,
    transitionExit: false,
  };
  _scrollLayer: Layer;
  _transitionLayer: Layer;

  _onDragEnd = (p: Point) => {
    this.setState({ scrollY: p.y });
  };

  _onClick = () => {
    if (this.state.transitionAnimatedProperties) {
      this.setState({
        transitionExit: true,
      });
    } else {
      let properties = this._transitionLayer.getFrame();
      let scrollProperties = this._scrollLayer.getFrame();
      properties.x += scrollProperties.x;
      properties.y += scrollProperties.y;
      this.setState({
        transitionAnimatedProperties: properties,
      });
    }
  };

  _onExit = () => {
    this.setState({
      transitionAnimatedProperties: null,
      transitionExit: false,
    });
  };

  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            properties={{ x: 0, y: this.state.scrollY, width: 375, height: 2000 }}
            draggable={true}
            draggableProperties={{
              constraintX: DragConstraint({ min: 0, max: 0 }),
              constraintY: this.state.constraintY,
              momentum: true,
            }}
            onDragEnd={this._onDragEnd}
            animator={SpringAnimator({ spring: 0.0001, friction: 0.02 })}
            ref={c => this._scrollLayer = c}
          >
            <Layer
              properties={{ x: 0, y: 0, width: 375, height: 300, backgroundColor: `rgb(255,153,153)` }}
            />
            <Layer
              properties={{ x: 0, y: 300, width: 375, height: 300, backgroundColor: `rgb(200,153,153)` }}
              style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <div>Hello!</div>
            </Layer>
            {!this.state.transitionAnimatedProperties &&
              <Layer
                properties={{ x: 0, y: 600, width: 375, height: 300 }}
                style={{ backgroundImage: 'url(http://d2h0v2e3t9v1o4.cloudfront.net/w1200/for/http://s3.bypaulshen.com.s3.amazonaws.com/photos/iceland/DSCF4104.jpg)' }}
                onClick={this._onClick}
                ref={c => this._transitionLayer = c}
              />}
            <Layer
              properties={{ x: 0, y: 900, width: 375, height: 300, backgroundColor: `rgb(153,153,200)` }}
            />
            <Layer
              properties={{ x: 0, y: 1200, width: 375, height: 300, backgroundColor: `rgb(153,200,153)` }}
            />
          </Layer>
          <ReactTransitionGroup>
            {this.state.transitionAnimatedProperties && !this.state.transitionExit &&
              <LayerTransitionChild
                enterProperties={this.state.transitionAnimatedProperties}
                properties={{ ...this.state.transitionAnimatedProperties, y: 0, height: 200 }}
                exitProperties={this.state.transitionAnimatedProperties}
                animator={SpringAnimator()}
                style={{ backgroundImage: 'url(http://d2h0v2e3t9v1o4.cloudfront.net/w1200/for/http://s3.bypaulshen.com.s3.amazonaws.com/photos/iceland/DSCF4104.jpg)' }}
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
