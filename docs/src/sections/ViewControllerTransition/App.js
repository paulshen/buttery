import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, LayerTransitionChild, SpringAnimator } from '../../proto';

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
      <Layer
        properties={{
          x: 0,
          y: 0,
          width: 375,
          height: 667,
        }}
        style={{ overflow: 'hidden' }}
      >
        <Layer
          properties={{
            x: 0,
            y: 0,
            width: 375,
            height: 667,
            backgroundColor: '#f0f0f0',
          }}
          onClick={this._showScreen}
        />
        <ReactTransitionGroup>
          {this.state.showScreen &&
            <LayerTransitionChild
              enterProperties={{
                x: 375,
                y: 0,
                width: 375,
                height: 667,
                backgroundColor: '#d0d0d0',
              }}
              properties={{
                x: 0,
                y: 0,
                width: 375,
                height: 667,
                backgroundColor: '#d0d0d0',
              }}
              exitProperties={{
                x: 0,
                y: 667,
                width: 375,
                height: 667,
                backgroundColor: '#d0d0d0',
              }}
              animator={SpringAnimator({ spring: 0.0001, friction: 0.02 })}
              onClick={this._hideScreen}
              key={this.state.screenIndex}
            />}
        </ReactTransitionGroup>
      </Layer>
    );
  }
}
