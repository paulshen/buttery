/* @flow */
import React from 'react';
import Radium from 'radium';

import { DragConstraint, Layer, SpringAnimator, Frame } from '../proto';

class App extends React.Component {
  state: {
    constraintY: DragConstraintType,
    scrollY: number,
    y: number,
    imageHeight: number,
  } = {
    constraintY: DragConstraint({
      min: 667 - 60 - 2000,
      max: 140,
      bounce: true,
    }),
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
            frame={Frame(0, 0, 375, 200)}
            properties={{
              backgroundImage:
                'url(http://d2h0v2e3t9v1o4.cloudfront.net/w400/for/http://s3.bypaulshen.com.s3.amazonaws.com/photos/iceland/DSCF4104.jpg)',
              transformOrigin: '50% 0%',
              scale: Math.max(1 + (this.state.y - 140) / 200, 1),
            }}
          />
          <Layer
            frame={Frame(0, this._getTextY(), 375, 40)}
            properties={{
              color: '#ffffff',
              fontSize: '32px',
              scale: Math.min(
                Math.max(1 + (this.state.y - 140) / 240, 0.5),
                1.5
              ),
              textAlign: 'center',
              textShadow: '0 1px 5px rgba(0,0,0,0.4)',
            }}
          >
            Iceland
          </Layer>
          <Layer
            frame={Frame(0, 60, 375, 607)}
            properties={{ overflow: 'hidden', pointerEvents: 'none' }}
          >
            <Layer
              frame={Frame(0, this.state.scrollY, 375, 2000)}
              properties={{
                backgroundImage:
                  'linear-gradient(to bottom, #bae4e5 0%, #2A8FBD 100%)',
                pointerEvents: 'all',
              }}
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
