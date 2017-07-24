/* @flow */
import React from 'react';
import Radium from 'radium';

import { Layer, SpringAnimator, Frame } from 'buttery';

class App extends React.Component {
  state = {
    numClicks: 0,
  };

  _onClick = () => {
    this.setState({
      numClicks: this.state.numClicks + 1,
    });
  };

  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            frame={Frame(100, 200, 80, 80)}
            properties={{
              backgroundColor: '#FE9D63',
              rotation: this.state.numClicks * 120,
              scaleX: this.state.numClicks % 2 === 0 ? 1 : 1.5,
              scaleY: this.state.numClicks % 2 === 0 ? 1 : 1.5,
              borderRadius: this.state.numClicks % 2 === 0 ? 2 : 10,
              shadowColor: 'rgba(0,0,0,0.15)',
              shadowBlur: this.state.numClicks % 2 === 1 ? 16 : 0,
              shadowSpread: this.state.numClicks % 2 === 1 ? 1 : 0,
            }}
            animator={SpringAnimator()}
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
