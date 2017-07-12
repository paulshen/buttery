/* @flow */
import React from 'react';
import Radium from 'radium';

import {
  DragConstraint,
  Layer,
  Frame,
  Animated,
  Drag,
  timed,
  spring
} from '../proto';

class App extends React.Component {
  state = {
    selected: false,
  };

  _toggle = () => {
    this.setState({
      selected: !this.state.selected,
    });
  };

  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <button onClick={this._toggle}>Toggle</button>
          <Layer
            frame={Frame(
              Drag(Animated(this.state.selected ? 200 : 100, timed())),
              Animated(this.state.selected ? 200 : 100, spring()),
              100,
              100
            )}
            properties={{
              backgroundColor: this.state.selected ? 'blue' : 'red',
            }}
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
