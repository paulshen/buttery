import React from 'react';

import { Layer, Frame, Animated, spring, timed } from '../../proto';

export default class Example extends React.Component {
  state = {
    toggledPosition: false,
    toggledDimension: false,
  };

  _onClickPosition = () => {
    this.setState({
      toggledPosition: !this.state.toggledPosition,
    });
  };

  _onClickDimension = () => {
    this.setState({
      toggledDimension: !this.state.toggledDimension,
    });
  };

  render() {
    // We simply add an animator instance to the Layer. Whenever Layer
    // properties change, they are animated.
    let { toggledPosition, toggledDimension } = this.state;
    return (
      <div>
        <div style={{ position: 'absolute' }}>
          <button onClick={this._onClickPosition}>
            Toggle position
          </button>
          <button onClick={this._onClickDimension}>
            Toggle dimensions
          </button>
        </div>
        <Layer
          frame={Frame(
            Animated(toggledPosition ? 100 : 140, timed(600)),
            Animated(toggledPosition ? 180 : 140, timed(300)),
            Animated(toggledDimension ? 120 : 60, spring()),
            Animated(toggledDimension ? 120 : 60, spring(12, 1)),
          )}
          style={{
            backgroundColor: '#1693A5',
          }}
        />
      </div>
    );
  }
}
