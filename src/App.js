/* @flow */
import React from 'react';
import Radium from 'radium';

import { LayerDraggable } from './proto';

class App extends React.Component {
  state = {
    step: 0,
  };

  _onClick = () => {
    this.setState({
      step: this.state.step === 0 ? 1 : 0,
    });
  };

  render() {
    let { step } = this.state;
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <LayerDraggable
            width={step === 0 ? 100 : 120}
            height={step === 0 ? 100 : 80}
            initialX={step === 0 ? 40 : 100}
            initialY={step === 0 ? 40 : 100}
            style={Styles.Fill}
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
  Fill: {
    backgroundColor: '#4990E2',
    borderRadius: '2px',
  },
}
