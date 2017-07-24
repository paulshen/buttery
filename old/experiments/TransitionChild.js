/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, Frame, LayerTransitionChild, Animated, spring } from 'buttery';

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
          enterFrame={{ x: 0, y: 0 }}
          frame={{
            x: Animated(100 + 20 * Math.floor(position / 20), spring()),
            y: Animated(100 + 20 * (position % 20), spring()),
            width: 10,
            height: 10,
          }}
          exitFrame={{
            x: Animated(0, spring()),
            y: Animated(0, spring()),
          }}
          enterStyle={{ opacity: 0 }}
          style={{
            opacity: Animated(1, spring()),
            backgroundColor: '#438DED',
          }}
          exitStyle={{ opacity: Animated(0, spring()) }}
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
            frame={Frame(200, 500, 50, 50)}
            style={{
              backgroundColor: '#97B2C9',
            }}
            onClick={this._onAddClick}
          />
          <Layer
            frame={Frame(300, 500, 50, 50)}
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
