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
      <Layer frame={Frame(0, 0, 375, 667)} style={{ overflow: 'hidden' }}>
        <Layer
          frame={Frame(0, 0, 375, 667)}
          style={{
            backgroundColor: '#f0f0f0',
          }}
          onClick={this._showScreen}
        />
        <ReactTransitionGroup>
          {this.state.showScreen &&
            <LayerTransitionChild
              enterFrame={{ x: 375 }}
              frame={Frame(Animated(0, spring()), 0, 375, 667)}
              exitFrame={{
                y: Animated(667, spring()),
              }}
              onClick={this._hideScreen}
              key={this.state.screenIndex}
              style={{
                backgroundColor: '#d0d0d0',
              }}
            />}
        </ReactTransitionGroup>
      </Layer>
    );
  }
}
