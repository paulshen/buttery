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
} from 'buttery';

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
          <Layer
            frame={Frame(
              Drag(this.state.x, {
                min: 0,
                max: 275,
                bounce: true,
                momentum: true,
              }),
              Drag(this.state.y, {
                min: 0,
                max: 567,
                bounce: true,
                momentum: true,
              }),
              100,
              100
            )}
            onDragEnd={({ x, y }) => {
              console.log(x, y)
              this.setState({ x, y });
            }}
            onClick={this._toggle}
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
