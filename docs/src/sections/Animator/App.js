import React from 'react';

import { Layer, Frame, Animated, spring, timed } from '../../proto';

export default class Example extends React.Component {
  state = {
    toggled: false,
  };

  _onClick = () => {
    this.setState({
      toggled: !this.state.toggled,
    });
  };

  render() {
    // We simply add an animator instance to the Layer. Whenever Layer
    // properties change, they are animated.
    let { toggled } = this.state;
    return (
      <div>
        <div style={{ position: 'absolute' }}>
          <button onClick={this._onClick}>
            Toggle
          </button>
        </div>
        <Layer
          frame={Frame(
            100,
            Animated(toggled ? 180 : 140, toggled ? timed(300): spring()),
            80,
            Animated(toggled ? 120 : 60, toggled ? timed(700): spring()),
          )}
          style={{
            backgroundColor: '#1693A5',
          }}
        />
      </div>
    );
  }
}
