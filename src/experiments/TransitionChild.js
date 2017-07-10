/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, LayerTransitionChild, SpringAnimator } from '../proto';

const Steps = [
  { width: 10, height: 10, x: 100, y: 100, opacity: 0 },
  { width: 10, height: 12, x: 110, y: 90, opacity: 1 },
  { width: 10, height: 10, x: 90, y: 180, opacity: 0 },
];

class App extends React.Component {
  state = {
    addClicks: 0,
    subtractClicks: 0,
  };

  _onAddClick = () => {
    this.setState({
      addClicks: this.state.addClicks + 14,
    });
  };

  _onSubtractClick = () => {
    this.setState({
      subtractClicks: this.state.subtractClicks + 8,
    });
  };

  render() {
    let children = [];
    for (let i = this.state.subtractClicks; i < this.state.addClicks; i++) {
      let position = i - this.state.subtractClicks;
      children.push(
        <LayerTransitionChild
          enterFrame={Steps[0]}
          frame={{
            ...Steps[1],
            x: Steps[1].x + 20 * Math.floor(position / 20),
            y: Steps[1].y + 20 * (position % 20),
          }}
          exitFrame={Steps[2]}
          enterProperties={Steps[0]}
          properties={Steps[1]}
          exitProperties={Steps[2]}
          animator={SpringAnimator()}
          style={{
            backgroundColor: '#438DED',
          }}
          key={i}
        />
      );
    }

    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <ReactTransitionGroup>
            {children}
          </ReactTransitionGroup>
          <Layer
            frame={{
              width: 50,
              height: 50,
              x: 200,
              y: 500,
            }}
            style={{
              backgroundColor: '#97B2C9',
            }}
            onClick={this._onAddClick}
          />
          <Layer
            frame={{
              width: 50,
              height: 50,
              x: 300,
              y: 500,
            }}
            style={{
              backgroundColor: '#97B2C9',
            }}
            onClick={this._onSubtractClick}
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
