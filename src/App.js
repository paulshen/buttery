/* @flow */
import React from 'react';
import Radium from 'radium';

import { Layer, LayerDraggable, SpringAnimator, LinearAnimator } from './proto';

const Steps = [
  { backgroundColor: '#438DED', width: 100, height: 100, x: 100, y: 100, },
  { backgroundColor: '#438DED', width: 80, height: 120, x: 110, y: 90, },
  { backgroundColor: '#438DED', width: 60, height: 60, x: 90, y: 180, },
];

const Animators = [
  new SpringAnimator(2000),
  new LinearAnimator(300),
  new SpringAnimator(300),
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
          <Layer properties={Steps[this.state.step]} animator={Animators[this.state.step]} />
          <Layer
            properties={{
              backgroundColor: '#97B2C9',
              width: 50,
              height: 50,
              x: 200,
              y: 500,
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
}
