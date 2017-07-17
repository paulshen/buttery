import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, LayerTransitionChild, Frame, Animated, spring } from '../../proto';

export default class App extends React.Component {
  state = {
    screenIndex: 0,
    showScreen: false,
  };

  _showScreen = () => {
    this.setState({
      screenIndex: this.state.screenIndex + 1,
      showScreen: true,
    });
  };

  _hideScreen = () => {
    this.setState({
      showScreen: false,
    });
  };

  render() {
    return (
      <Layer frame={Frame(0, 0, 320, 320)} style={{ overflow: 'hidden' }}>
        <Layer
          frame={Frame(0, 0, 320, 320)}
          style={{
            backgroundColor: '#ffffff',
          }}
          onClick={this._showScreen}
        />
        <ReactTransitionGroup>
          {this.state.showScreen &&
            <LayerTransitionChild
              enterFrame={{ x: 320 }}
              frame={Frame(Animated(0, spring(170, 26)), 0, 320, 320)}
              exitFrame={{
                y: Animated(320, spring(170, 26)),
              }}
              onClick={this._hideScreen}
              key={this.state.screenIndex}
              style={{
                backgroundColor: '#49c6ae',
              }}
            />}
        </ReactTransitionGroup>
      </Layer>
    );
  }
}
