import React from 'react';
import {
  LayerTransitionChild,
  Animated,
  Drag,
  spring,
  timed
} from 'buttery';
import ReactTransitionGroup from 'react-addons-transition-group';

const START_X = (375 - 200) / 2;

export default class Example extends React.Component {
  state = {
    x: START_X,
    targetX: START_X,
    index: 0,
  };

  _onMove = ({ x }) => {
    this.setState({ x });
  };

  _onDragRelease = ({ x }) => {
    let targetX = START_X;
    if (x < START_X - 100) {
      targetX = START_X - 375;
    } else if (x > START_X + 100) {
      targetX = START_X + 375;
    }
    this.setState({
      targetX,
    });
    if (targetX !== START_X) {
      setTimeout(() => {
        this.setState({ index: this.state.index + 1 });
      }, 0);
    }
  };

  render() {
    return (
      <ReactTransitionGroup>
        <LayerTransitionChild
          frame={{
            x: Drag(Animated(START_X, spring())),
            y: 180,
            width: 200,
            height: 200,
          }}
          exitFrame={{
            x: Animated(this.state.targetX, spring()),
          }}
          onDrag={this._onDrag}
          onMove={this._onMove}
          onDragRelease={this._onDragRelease}
          style={{
            backgroundColor: '#49c6ae',
            opacity: Animated(1, timed(300)),
            rotate: (this.state.x - START_X) / 12,
            scale: Animated(1, spring()),
          }}
          enterStyle={{
            opacity: 0,
            scale: 0.5,
          }}
          key={this.state.index}
        />
      </ReactTransitionGroup>
    );
  }
}
