/* @flow */
import React from 'react';
import Radium from 'radium';

import { DragConstraint, Layer } from '../proto';

function Screen({ index, x, backgroundColor }: {
  index: number,
  x: number,
  backgroundColor: string,
}) {
  return (
    <Layer
      properties={{
        x: x > -375 * index ? (375 * index) + x : Math.max((x + 375 * index) / 4, -375),
        y: 0,
        width: 375,
        height: 667,
        opacity: x > -375 * index ? 1 : 1 - Math.max((x + 375 * index) / -375, 0),
        scale: x > -375 * index ? 1 : 1 - Math.max((x + 375 * index) / -10000, 0),
        backgroundColor,
      }}
    />
  );
}

class App extends React.Component {
  state = {
    x: 0,
    scrollX: 0,
  };

  _onDragEnd = (p: Point) => {
    this.setState({
      scrollX: p.x,
    });
  };

  _onMove = (p: Point) => {
    this.setState({
      x: p.x,
    });
  };

  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Screen
            x={this.state.x}
            index={0}
            backgroundColor="#ADD8C7"
          />
          <Screen
            x={this.state.x}
            index={1}
            backgroundColor="#FBB829"
          />
          <Screen
            x={this.state.x}
            index={2}
            backgroundColor="#FF9999"
          />
          <Layer
            properties={{
              x: this.state.scrollX,
              y: 0,
              width: 375 * 3,
              height: 667,
            }}
            draggable={true}
            draggableProperties={{
              constraintY: DragConstraint({ min: 0, max: 0 }),
              constraintX: DragConstraint({ min: -375 * 2, max: 0, type: 'bounce' }),
              pageSize: 375,
            }}
            onDragEnd={this._onDragEnd}
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
