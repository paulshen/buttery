import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, LayerTransitionChild, Frame, SpringAnimator } from '../../proto';

function getFrame(i) {
  return {
    x: 47.5 + 60 * (i % 5),
    y: 40 + 60 * Math.floor(i / 5),
    width: 40,
    height: 40,
  };
}

export default class Example extends React.Component {
  state = {
    numStart: 0,
    numEnd: 0,
  };

  _onClickAdd = () => {
    this.setState({
      numEnd: this.state.numEnd + 1,
    });
  };

  _onClickRemove = () => {
    this.setState({
      numStart: Math.min(this.state.numStart + 1, this.state.numEnd),
    });
  };

  render() {
    let layers = [];
    for (let i = 0; i < this.state.numEnd - this.state.numStart; i++) {
      layers.push(
        <LayerTransitionChild
          frame={getFrame(i)}
          enterProperties={{
            backgroundColor: 'lightblue',
            opacity: 0,
          }}
          properties={{
            backgroundColor: 'lightblue',
            opacity: 1,
          }}
          exitProperties={{
            backgroundColor: 'lightblue',
            opacity: 0,
          }}
          animator={SpringAnimator({ spring: 0.0001, friction: 0.02 })}
          key={this.state.numStart + i}
        />
      );
    }

    return (
      <Layer frame={Frame(0, 0, 375, 667)}>
        <button onClick={this._onClickAdd}>Add</button>
        <button onClick={this._onClickRemove}>Remove</button>
        <ReactTransitionGroup>
          {layers}
        </ReactTransitionGroup>
      </Layer>
    );
  }
}
