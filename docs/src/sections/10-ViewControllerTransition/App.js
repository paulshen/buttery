import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, LayerTransitionChild, Frame, Animated, spring } from 'buttery';

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
      <Layer frame={Frame(0, 0, 400, 400)} style={{ overflow: 'hidden' }}>
        <div style={{ position: 'absolute' }}>
          <button onClick={this._showScreen}>Show screen</button>
        </div>
        <ReactTransitionGroup>
          {this.state.showScreen &&
            <LayerTransitionChild
              enterFrame={{ x: 400 }}
              frame={Frame(Animated(0, spring(170, 26)), 0, 400, 400)}
              exitFrame={{
                y: Animated(400, spring(170, 26)),
              }}
              key={this.state.screenIndex}
              style={{
                backgroundColor: '#EE7CBE',
              }}
            >
              <button onClick={this._hideScreen}>Dismiss screen</button>
            </LayerTransitionChild>}
        </ReactTransitionGroup>
      </Layer>
    );
  }
}
