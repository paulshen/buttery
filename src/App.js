/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import { DragConstraint, Layer, LayerTransitionChild, SpringAnimator, LinearAnimator } from './proto';

class App extends React.Component {
  state = {
    point: { x: 0, y: 0 },
  };

  _onMove = (p: Point) => {
    this.setState({
      point: p,
    });
  };

  render() {
    let opacity = 1;
    let { x, y } = this.state.point;
    if (x < 0) {
      opacity -= Math.min(-x / 80, 0.5);
    }
    if (y < 0) {
      opacity -= Math.min(-y / 80, 0.5);
    }
    if (x > 375 - 80) {
      opacity -= Math.min((x - (375 - 80)) / 80, 0.5);
    }
    if (y > 667 - 80) {
      opacity -= Math.min((y - (667 - 80)) / 80, 0.5);
    }
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            properties={{
              ...this.state.point,
              width: 80,
              height: 80,
              backgroundColor: '#FF9999',
              borderRadius: 8,
              opacity,
            }}
            draggable={true}
            draggableProperties={{
              constraintY: new DragConstraint({ min: 0, max: 667 - 80, type: 'bounce' }),
              constraintX: new DragConstraint({ min: 0, max: 375 - 80, type: 'bounce' }),
              momentum: true,
            }}
            onMove={this._onMove}
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
