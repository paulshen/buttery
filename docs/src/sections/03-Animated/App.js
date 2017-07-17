import React from 'react';

import { Layer, Frame, Animated, spring, timed } from '../../proto';

export default class Example extends React.Component {
  state = {
    toggledFrame: false,
    toggledRadius: false,
  };

  _onClickPosition = () => {
    this.setState({
      toggledFrame: !this.state.toggledFrame,
    });
  };

  _onClickDimension = () => {
    this.setState({
      toggledRadius: !this.state.toggledRadius,
    });
  };

  render() {
    // We simply add an animator instance to the Layer. Whenever Layer
    // properties change, they are animated.
    let { toggledFrame, toggledRadius } = this.state;
    return (
      <div>
        <div style={{ position: 'absolute' }}>
          <button onClick={this._onClickPosition}>Toggle frame</button>
          <button onClick={this._onClickDimension}>Toggle radius</button>
        </div>
        <Layer
          frame={Frame(
            Animated(toggledFrame ? 100 : 120, spring()),
            Animated(toggledFrame ? 100 : 120, spring()),
            Animated(toggledFrame ? 120 : 80, spring()),
            Animated(toggledFrame ? 120 : 80, spring())
          )}
          style={{
            backgroundColor: '#49c6ae',
            borderRadius: Animated(
              toggledRadius ? (toggledFrame ? 60 : 40) : 0,
              timed(300)
            ),
          }}
        />
      </div>
    );
  }
}
