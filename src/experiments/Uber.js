/* @flow */
import React from 'react';
import Radium from 'radium';

import { Layer, Frame, Animated, Drag, spring } from '../proto';

function interpolate(x1, x2, y1, y2) {
  return function(input) {
    return Math.min(Math.max((input - x1) / (x2 - x1), 0), 1) * (y2 - y1) + y1;
  };
}

function Header({ y, onClick }) {
  return (
    <Layer
      frame={Frame(0, 0, 375, Math.max(y, 60))}
      style={{
        backgroundColor: '#000000',
        opacity: interpolate(400, 100, 0, 1)(y),
        pointerEvents: y < 549 ? 'auto' : 'none',
      }}
      onClick={onClick}
    >
      <Layer
        frame={Frame(
          interpolate(90, 60, 20, 40)(y),
          y < 100
            ? interpolate(90, 60, 50, 24)(y)
            : interpolate(400, 100, 140, 50)(y),
          375,
          50
        )}
        style={{
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
      frame={Frame(index * 300, 0, 300, 200)}
      style={{ backgroundColor: color }}
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
        frame={Frame(
          Drag(this.state.pageX, {
            min: 375 - 900,
            max: 0,
            bounce: true,
            momentum: true,
          }),
          400,
          900,
          200
        )}
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
            frame={Frame(0, 0, 375, 667)}
            style={{
              backgroundColor: 'skyblue',
            }}
          />
          <Layer
            frame={Frame(
              0,
              Drag(Animated(this.state.scrollY, spring(0.0001, 0.02)), {
                min: 667 - 1200,
                max: this.state.y < 100 ? 100 : 550,
                bounce: true,
                momentum: this.state.y < 100,
              }),
              375,
              1200
            )}
            style={{
              backgroundColor: 'blue',
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
