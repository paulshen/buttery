/* @flow */
import React from 'react';
import Radium from 'radium';

import { DragConstraint, Layer, SpringAnimator, Rect } from '../proto';

function interpolate(x1, x2, y1, y2) {
  return function(input) {
    return Math.min(Math.max((input - x1) / (x2 - x1), 0), 1) * (y2 - y1) + y1;
  };
}

class App extends React.Component {
  state = {
    y: 550,
    scrollY: 550,
    pageX: 0,
  };

  _onDragEnd = (p: Point) => {
    let targetOpen;
    if (p.y < 50) {
      targetOpen = true;
    } else if (p.y > 500) {
      targetOpen = false;
    } else {
      targetOpen = this.state.scrollY > 100;
    }
    this.setState({
      scrollY: targetOpen ? Math.min(100, p.y) : 550,
    });
  };

  _onMove = (p: Point) => {
    this.setState({
      y: p.y,
    });
  };

  _onHeaderClick = () => {
    if (this.state.scrollY <= 100) {
      this.setState({
        scrollY: 550,
      });
    }
  };

  _onPagerDragEnd = (p: Point) => {
    this.setState({
      pageX: p.x,
    });
  };

  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            frame={Rect(0, 0, 375, 667)}
            properties={{
              backgroundColor: 'skyblue',
            }}
          />
          <Layer
            frame={Rect(0, 0, 375, 667)}
            properties={{
              backgroundColor: '#000000',
              opacity: (550 - this.state.y) / 300,
            }}
          />
          <Layer
            frame={Rect(0, this.state.scrollY, 375, 1200)}
            properties={{
              backgroundColor: 'blue',
            }}
            animator={SpringAnimator({ spring: 0.0001, friction: 0.02 })}
            draggable={true}
            draggableProperties={{
              constraintX: DragConstraint({ min: 0, max: 0 }),
              constraintY: DragConstraint({
                min: 667 - 1200,
                max: this.state.y < 100 ? 100 : 550,
                bounce: true,
              }),
              momentum: this.state.y < 100,
            }}
            onDragEnd={this._onDragEnd}
            onMove={this._onMove}
          >
            <Layer
              frame={Rect(this.state.pageX, 400, 900, 200)}
              draggable={true}
              draggableProperties={{
                constraintY: DragConstraint({ min: 400, max: 400 }),
                constraintX: DragConstraint({
                  min: 375 - 900,
                  max: 0,
                  bounce: true,
                }),
                pageSize: 300,
              }}
              onDragEnd={this._onPagerDragEnd}
            >
              <Layer
                frame={Rect(0, 0, 300, 200)}
                properties={{ backgroundColor: 'red' }}
              />
              <Layer
                frame={Rect(300, 0, 300, 200)}
                properties={{ backgroundColor: 'purple' }}
              />
              <Layer
                frame={Rect(600, 0, 300, 200)}
                properties={{ backgroundColor: 'yellow' }}
              />
            </Layer>
          </Layer>
          <Layer
            frame={Rect(0, 0, 375, Math.max(Math.min(this.state.y, 100), 60))}
            properties={{
              backgroundColor: '#000000',
              opacity: this.state.y <= 100 ? 1 : 0,
            }}
            onClick={this._onHeaderClick}
          />
          <Layer
            frame={Rect(
              interpolate(90, 60, 20, 40)(this.state.y),
              this.state.y < 100
                ? interpolate(90, 60, 50, 24)(this.state.y)
                : interpolate(400, 100, 140, 50)(this.state.y),
              375,
              50
            )}
            properties={{
              color: '#FFFFFF',
              opacity: interpolate(400, 100, 0, 1)(this.state.y),
            }}
          >
            Messages
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
