import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, LayerTransitionChild, Rect, SpringAnimator } from '../../proto';

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
      <Layer frame={Rect(0, 0, 375, 667)} style={{ overflow: 'hidden' }}>
        <Layer
          frame={Rect(0, 0, 375, 667)}
          properties={{
            backgroundColor: '#f0f0f0',
          }}
          onClick={this._showScreen}
        />
        <ReactTransitionGroup>
          {this.state.showScreen &&
            <LayerTransitionChild
              enterFrame={Rect(375, 0, 375, 667)}
              frame={Rect(0, 0, 375, 667)}
              exitFrame={Rect(0, 667, 375, 667)}
              animator={SpringAnimator({ spring: 0.0001, friction: 0.02 })}
              onClick={this._hideScreen}
              key={this.state.screenIndex}
              properties={{
                backgroundColor: '#d0d0d0',
              }}
            />}
        </ReactTransitionGroup>
      </Layer>
    );
  }
}
