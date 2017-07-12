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
    x: 100,
    y: 100,
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
              Drag(this.state.x, { min: 0, max: 200, bounce: true }),
              Drag(this.state.y),
              100,
              100
            )}
            onDragEnd={({ x, y }) => this.setState({ x, y })}
            style={{
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
