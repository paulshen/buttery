import React from 'react';

import { TimedAnimator, Layer, Rect, SpringAnimator } from '../../proto';

const MyFrames = [
  Rect(100, 140, 60, 60),
  Rect(100, 180, 80, 80),
  Rect(100, 220, 100, 100),
];

export default class Example extends React.Component {
  state = {
    index: 0,
    animator: null,
  };

  _onClick = animatorType => {
    this.setState({
      index: (this.state.index + 1) % MyFrames.length,
      animator:
        animatorType === 'spring'
          ? SpringAnimator()
          : TimedAnimator({ duration: 200 }),
    });
  };

  render() {
    // We simply add an animator instance to the Layer. Whenever Layer
    // properties change, they are animated.
    return (
      <div>
        <div style={{ position: 'absolute' }}>
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
        </div>
        <Layer
          frame={MyFrames[this.state.index]}
          properties={{
            backgroundColor: '#1693A5',
            opacity: 1 - this.state.index * 0.2,
          }}
          animator={this.state.animator}
        />
      </div>
    );
  }
}
