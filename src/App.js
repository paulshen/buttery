/* @flow */
import React from 'react';
import Radium from 'radium';

import { Layer, LayerDraggable } from './proto';

class App extends React.Component {
  state = {
    x: 0,
  };

  _onMove = ({ x, y }) => {
    this.setState({
      x,
    });
  };

  render() {
    let colorValue = Math.round(Math.max(Math.min(-this.state.x / 750, 1), 0) * 255);
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <LayerDraggable
            properties={{
              width: 1125,
              height: 667,
              x: 0,
              y: 0,
            }}
            initialX={0}
            initialY={0}
            onMove={this._onMove}
            viewportSize={{ width: 375, height: 667 }}
            pageSize={375}>
            <Layer
              properties={{
                width: 375,
                height: 667,
                x: 0,
                y: 0,
                backgroundColor: `rgb(220,220,${colorValue})`,
              }}
            />
            <Layer
              properties={{
                width: 375,
                height: 667,
                x: 375,
                y: 0,
                backgroundColor: `rgb(220,${colorValue},220)`,
              }}
            />
            <Layer
              properties={{
                width: 375,
                height: 667,
                x: 750,
                y: 0,
                backgroundColor: `rgb(${colorValue},220,220)`,
              }}
            />
          </LayerDraggable>
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
