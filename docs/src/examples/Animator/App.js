import React from 'react';

import { TimedAnimator, Layer, SpringAnimator } from '../../proto';

const MyProperties = [
  { x: 100, y: 140, width: 60, height: 60, backgroundColor: '#1693A5', opacity: 1 },
  { x: 100, y: 180, width: 80, height: 80, backgroundColor: '#1693A5', opacity: 0.8 },
  { x: 100, y: 220, width: 100, height: 100, backgroundColor: '#1693A5', opacity: 0.6 },
];

export default class Example extends React.Component {
  state = {
    index: 0,
    animator: null,
  };

  _onClick = (animatorType) => {
    this.setState({
      index: (this.state.index + 1) % MyProperties.length,
      animator: animatorType === 'spring' ? SpringAnimator() : TimedAnimator({ duration: 200 }),
    });
  };

  render() {
    // We simply add an animator instance to the Layer. Whenever Layer
    // properties change, they are animated.
    return (
      <div>
        <div>
          <button onClick={() => this._onClick('timed')}>
            Toggle with TimedAnimator
          </button>
        </div>
        <div>
          <button onClick={() => this._onClick('spring')}>
            Toggle with SpringAnimator
          </button>
        </div>
        <Layer
          properties={MyProperties[this.state.index]}
          animator={this.state.animator}
        />
      </div>
    );
  }
}
