/* @flow */
import React from 'react';
import Radium from 'radium';

import { DragConstraint, Layer, SpringAnimator, Rect } from '../proto';

function interpolate(x1, x2, y1, y2) {
  return function(input) {
    return Math.min(Math.max((input - x1) / (x2 - x1), 0), 1) * (y2 - y1) + y1;
  };
}

function Header({ y, onClick }) {
  return (
    <Layer
      frame={Rect(0, 0, 375, Math.max(y, 60))}
      properties={{
        backgroundColor: '#000000',
        opacity: interpolate(400, 100, 0, 1)(y),
        pointerEvents: y < 549 ? 'auto' : 'none',
      }}
      onClick={onClick}
    >
      <Layer
        frame={Rect(
          interpolate(90, 60, 20, 40)(y),
          y < 100
            ? interpolate(90, 60, 50, 24)(y)
            : interpolate(400, 100, 140, 50)(y),
          375,
          50
        )}
        properties={{
          color: '#FFFFFF',
        }}
      >
        Messages
      </Layer>
    </Layer>
  );
}

function PagerPage({ index, color }) {
  return (
    <Layer
      frame={Rect(index * 300, 0, 300, 200)}
      properties={{ backgroundColor: color }}
    />
  );
}

class Pager extends React.Component {
  state = {
    pageX: 0,
  };

  _onDragEnd = (p: Point) => {
    this.setState({
      pageX: p.x,
    });
  };

  render() {
    return (
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
        onDragEnd={this._onDragEnd}
      >
        <PagerPage index={0} color="red" />
        <PagerPage index={1} color="purple" />
        <PagerPage index={2} color="yellow" />
      </Layer>
    );
  }
}

class App extends React.Component {
  state = {
    y: 550,
    scrollY: 550,
  };

  _onDragEnd = (p: Point) => {
    let wasTargetOpen = this.state.scrollY <= 100;
    let targetOpen = wasTargetOpen;
    if (p.y < 100) {
      targetOpen = true;
    } else if (p.y > 450) {
      targetOpen = false;
    } else if (wasTargetOpen && p.y > 100 + 100) {
      targetOpen = false;
    } else if (!wasTargetOpen && p.y < 450 - 20) {
      targetOpen = true;
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
            <Pager />
          </Layer>
          <Header y={this.state.y} onClick={this._onHeaderClick} />
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
