/* @flow */
import React from 'react';
import Radium from 'radium';

import { DragConstraint, Layer, SpringAnimator } from '../proto';

class App extends React.Component {
  state: {
    constraintY: DragConstraintType,
    scrollY: number,
    y: number,
    imageHeight: number,
  } = {
    constraintY: DragConstraint({ min: 667 - 60 - 2000, max: 140, type: 'bounce' }),
    scrollY: 140,
    y: 140,
    imageHeight: 200,
  };

  _onMove = (p: Point) => {
    this.setState({
      y: p.y,
    });
  };

  _onDragEnd = (p: Point) => {
    this.setState({ scrollY: p.y });
  };

  _getTextY = () => {
    let { y } = this.state;
    if (y < 140) {
      return Math.max(84 - (140 - y) / 2, 14);
    }
    return 84 + (y - 140) / 2;
  };

  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            properties={{ x: 0, y: 0, width: 375, height: 200, scale: Math.max(1 + (this.state.y - 140) / 200, 1) }}
            style={{
              backgroundImage: 'url(http://d2h0v2e3t9v1o4.cloudfront.net/w400/for/http://s3.bypaulshen.com.s3.amazonaws.com/photos/iceland/DSCF4104.jpg)',
              transformOrigin: '50% 0%',
            }}
          />
          <Layer
            properties={{ x: 0, y: this._getTextY(), width: 375, height: 40, scale: Math.min(Math.max(1 + (this.state.y - 140) / 240, 0.5), 1.5) }}
            style={{ color: '#ffffff', fontSize: '32px', textAlign: 'center', textShadow: '0 1px 5px rgba(0,0,0,0.4)' }}>
            Iceland
          </Layer>
          <Layer
            properties={{ x: 0, y: 60, width: 375, height: 607 }}
            style={{ overflow: 'hidden', pointerEvents: 'none' }}>
            <Layer
              properties={{ x: 0, y: this.state.scrollY, width: 375, height: 2000 }}
              style={{ backgroundImage: 'linear-gradient(to bottom, #bae4e5 0%, #2A8FBD 100%)', pointerEvents: 'all' }}
              draggable={true}
              draggableProperties={{
                constraintX: DragConstraint({ min: 0, max: 0 }),
                constraintY: this.state.constraintY,
                momentum: true,
              }}
              onMove={this._onMove}
              onDragEnd={this._onDragEnd}
              animator={SpringAnimator({ spring: 0.0001, friction: 0.02 })}
            />
          </Layer>
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
