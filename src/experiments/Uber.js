/* @flow */
import React from 'react';
import Radium from 'radium';

import { DragConstraint, Layer, SpringAnimator } from '../proto';

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
          <Layer properties={{
            x: 0,
            y: 0,
            width: 375,
            height: 667,
            backgroundColor: 'skyblue',
          }} />
          <Layer properties={{
            x: 0,
            y: 0,
            width: 375,
            height: 667,
            backgroundColor: '#000000',
            opacity: (550 - this.state.y) / 300,
          }} />
          <Layer
            properties={{
              x: 0,
              y: this.state.scrollY,
              width: 375,
              height: 1200,
              backgroundColor: 'blue',
            }}
            animator={SpringAnimator({ spring: 0.0001, friction: 0.02 })}
            draggable={true}
            draggableProperties={{
              constraintX: DragConstraint({ min: 0, max: 0 }),
              constraintY: DragConstraint({ min: 667 - 1200, max: this.state.y < 100 ? 100 : 550, type: 'bounce' }),
              momentum: this.state.y < 100,
            }}
            onDragEnd={this._onDragEnd}
            onMove={this._onMove}>
            <Layer
              properties={{
                x: this.state.pageX,
                y: 400,
                width: 900,
                height: 200,
              }}
              draggable={true}
              draggableProperties={{
                constraintY: DragConstraint({ min: 400, max: 400 }),
                constraintX: DragConstraint({ min: 375 - 900, max: 0, type: 'bounce' }),
                pageSize: 300,
              }}
              onDragEnd={this._onPagerDragEnd}
            >
              <Layer properties={{ x: 0, y: 0, width: 300, height: 200, backgroundColor: 'red' }} />
              <Layer properties={{ x: 300, y: 0, width: 300, height: 200, backgroundColor: 'purple' }} />
              <Layer properties={{ x: 600, y: 0, width: 300, height: 200, backgroundColor: 'yellow' }} />
            </Layer>
          </Layer>
          <Layer properties={{
            x: 0,
            y: 0,
            width: 375,
            height: Math.max(Math.min(this.state.y, 100), 60),
            backgroundColor: '#000000',
            opacity: this.state.y <= 100 ? 1 : 0,
          }} onClick={this._onHeaderClick} />
          <Layer properties={{
            x: interpolate(90, 60, 20, 40)(this.state.y),
            y: this.state.y < 100 ? interpolate(90, 60, 50, 24)(this.state.y) : interpolate(400, 100, 140, 50)(this.state.y),
            width: 375,
            height: 50,
            opacity: interpolate(400, 100, 0, 1)(this.state.y),
          }} style={{ color: '#FFFFFF' }}>
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
