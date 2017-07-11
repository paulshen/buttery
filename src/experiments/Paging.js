/* @flow */
import React from 'react';
import Radium from 'radium';

import { Layer, DragConstraint, Rect } from '../proto';

class App extends React.Component {
  state = {
    x: 0,
  };

  _onMove = ({ x }) => {
    this.setState({
      x,
    });
  };

  render() {
    let colorValue = Math.round(
      Math.max(Math.min(-this.state.x / 750, 1), 0) * 255
    );
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            frame={Rect(this.state.x, 0, 1125, 667)}
            onMove={this._onMove}
            draggable={true}
            draggableProperties={{
              constraintX: DragConstraint({
                min: -375 * 2,
                max: 0,
                bounce: true,
              }),
              constraintY: DragConstraint({ min: 0, max: 0 }),
              pageSize: 375,
            }}
          >
            <Layer
              frame={Rect(0, 0, 375, 667)}
              properties={{
                backgroundColor: `rgb(220,220,${colorValue})`,
              }}
            />
            <Layer
              frame={Rect(375, 0, 375, 667)}
              properties={{
                backgroundColor: `rgb(220,${colorValue},220)`,
              }}
            />
            <Layer
              frame={Rect(750, 0, 375, 667)}
              properties={{
                backgroundColor: `rgb(${colorValue},220,220)`,
              }}
            />
          </Layer>
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
