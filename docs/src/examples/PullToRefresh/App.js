import React from 'react';
import { Layer, Frame, Animated, Drag, spring, timed } from 'buttery';

class SwipeableRow extends React.Component {
  state = {
    x: 16,
  };

  _onDragRelease = ({ x }) => {
    this.setState({
      x: x < -36 ? -48 : (x > 52 ? 64 : 16),
    });
  };

  render() {
    return (
      <div style={{ display: 'flex', height: '84px', position: 'relative' }}>
        <Layer
          frame={Frame(
            Drag(Animated(this.state.x, spring(170, 26)), {
              min: -48,
              max: 64,
              bounce: true,
            }),
            16,
            375 - 16 * 2,
            70
          )}
          onDragRelease={this._onDragRelease}
          style={{
            backgroundColor: '#49c6ae',
            borderRadius: '4px',
          }}
        />
      </div>
    );
  }
}

export default class Example extends React.Component {
  state = {
    y: 0,
    refreshing: false,
  };

  _onDragRelease = ({ y }) => {
    if (y > 58) {
      this.setState({ refreshing: true, y: 58 });
      setTimeout(() => {
        this.setState({ y: 0 });
        setTimeout(() => {
          this.setState({
            refreshing: false,
          });
        }, 1000);
      }, 1000);
    }
  };

  _onDragEnd = ({ y }) => {
    if (!this.state.refreshing) {
      this.setState({ y: Math.min(y, 0) });
    }
  };

  render() {
    return (
      <Layer frame={Frame(0, 0, 375, 667)} style={{ overflow: 'hidden' }}>
        <Layer
          frame={Frame(
            0,
            Drag(Animated(this.state.y, spring(170, 26)), {
              min: 667 - 856,
              max: this.state.refreshing ? 58 : 0,
              bounce: true,
              momentum: true,
            }),
            375,
            856
          )}
          onDragRelease={this._onDragRelease}
          onDragEnd={this._onDragEnd}
        >
          <Layer
            frame={Frame(177, -30, 20, 20)}
            style={{
              backgroundColor: '#49c6ae',
              rotate: this.state.refreshing ? Animated(375, timed(2000)) : 0,
            }}
          />
          <SwipeableRow />
          <SwipeableRow />
          <SwipeableRow />
          <SwipeableRow />
          <SwipeableRow />
          <SwipeableRow />
          <SwipeableRow />
          <SwipeableRow />
          <SwipeableRow />
          <SwipeableRow />
        </Layer>
      </Layer>
    );
  }
}
