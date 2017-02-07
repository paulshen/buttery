/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, LayerDraggable, LayerTransitionChild, SpringAnimator, LinearAnimator } from './proto';

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
            properties={{
              x: 100,
              y: 200,
              width: 80,
              height: 80,
              backgroundColor: '#FE9D63',
              rotation: this.state.numClicks * 120,
              scaleX: this.state.numClicks % 2 === 0 ? 1 : 1.5,
              scaleY: this.state.numClicks % 2 === 0 ? 1 : 1.5,
              borderRadius: this.state.numClicks % 2 === 0 ? 2 : 10,
            }}
            animator={new SpringAnimator(1000)}
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
