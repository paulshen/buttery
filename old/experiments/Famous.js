/* @flow */
import React from 'react';
import Radium from 'radium';

import { DragConstraint, Layer, Frame } from 'buttery';

function Screen({
  index,
  scrollX,
  backgroundColor,
}: {
  index: number,
  scrollX: number,
  backgroundColor: string,
}) {
  let x =
    scrollX > -375 * index
      ? 375 * index + scrollX
      : Math.max((scrollX + 375 * index) / 4, -375);
  return (
    <Layer
      frame={Frame(x, 0, 375, 667)}
      properties={{
        backgroundColor,
        opacity:
          scrollX > -375 * index
            ? 1
            : 1 - Math.max((scrollX + 375 * index) / -375, 0),
        scale:
          scrollX > -375 * index
            ? 1
            : 1 - Math.max((scrollX + 375 * index) / -10000, 0),
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
          <Screen scrollX={this.state.x} index={0} backgroundColor="#ADD8C7" />
          <Screen scrollX={this.state.x} index={1} backgroundColor="#FBB829" />
          <Screen scrollX={this.state.x} index={2} backgroundColor="#FF9999" />
          <Layer
            frame={Frame(this.state.scrollX, 0, 375 * 3, 667)}
            draggable={true}
            draggableProperties={{
              constraintY: DragConstraint({ min: 0, max: 0 }),
              constraintX: DragConstraint({
                min: -375 * 2,
                max: 0,
                bounce: true,
              }),
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
