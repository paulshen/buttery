/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, LayerDraggable, LayerTransitionChild, SpringAnimator, LinearAnimator } from '../proto';

const Steps = [
  { backgroundColor: '#438DED', width: 10, height: 10, x: 100, y: 100, opacity: 0 },
  { backgroundColor: '#438DED', width: 10, height: 12, x: 110, y: 90, opacity: 1 },
  { backgroundColor: '#438DED', width: 60, height: 60, x: 90, y: 180, opacity: 0 },
];

const Animators = [
  new SpringAnimator(2000),
  new LinearAnimator(300),
  new SpringAnimator(300),
];

class App extends React.Component {
  state = {
    clicks: 0,
  };

  _onClick = () => {
    this.setState({
      clicks: this.state.clicks + 14,
    });
  };

  render() {
    let children = [];
    for (let i = 0; i < this.state.clicks; i++) {
      children.push(
        <LayerTransitionChild
          enterProperties={Steps[0]}
          properties={{ ...Steps[1], x: Steps[1].x + 20 * Math.floor(i / 20), y: Steps[1].y + 20 * (i % 20)}}
          exitProperties={Steps[2]}
          animator={new SpringAnimator(1000)}
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
            properties={{
              backgroundColor: '#97B2C9',
              width: 50,
              height: 50,
              x: 200,
              y: 500,
            }}
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
