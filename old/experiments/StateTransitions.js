/* @flow */
import React from 'react';
import Radium from 'radium';

import { Layer, SpringAnimator, TimedAnimator } from '../proto';

const Steps = [
  { width: 100, height: 100, x: 100, y: 100 },
  { width: 80, height: 120, x: 110, y: 90 },
  { width: 60, height: 60, x: 90, y: 180 },
];

const Animators = [
  SpringAnimator(),
  TimedAnimator({ duration: 300 }),
  SpringAnimator(),
];

class App extends React.Component {
  state = {
    step: 0,
  };

  _onClick = () => {
    this.setState({
      step: (this.state.step + 1) % 3,
    });
  };

  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            frame={Steps[this.state.step]}
            properties={{
              backgroundColor: '#438DED',
            }}
            animator={Animators[this.state.step]}
          />
          <Layer
            frame={{
              width: 50,
              height: 50,
              x: 200,
              y: 500,
            }}
            properties={{
              backgroundColor: '#97B2C9',
            }}
            onClick={this._onClick}
          />
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
