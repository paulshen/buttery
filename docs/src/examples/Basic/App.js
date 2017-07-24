import React from 'react';
import { Layer, Animated, spring, timed } from 'buttery';

export default class Example extends React.Component {
  state = {
    toggled: false,
  };

  _toggle = () => {
    this.setState({
      toggled: !this.state.toggled,
    })
  };

  render() {
    let { toggled } = this.state;
    return (
      <div>
        <div style={{ position: 'absolute' }}>
          <button onClick={this._toggle}>Toggle</button>
        </div>
        <Layer
          frame={{
            x: Animated(toggled ? 240 : 60, spring()),
            y: 120,
            width: 60,
            height: 60,
          }}
          style={{
            backgroundColor: '#49c6ae',
          }}
        />
        <Layer
          frame={{
            x: Animated(toggled ? 240 : 60, spring()),
            y: 240,
            width: 60,
            height: 60,
          }}
          style={{
            backgroundColor: '#49c6ae',
          }}
        />
      </div>
    );
  }
}
