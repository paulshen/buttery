import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, LayerTransitionChild, SpringAnimator } from '../../proto';

const OverlayProperties = {
  x: 0,
  y: 100,
  width: 375,
  height: 567,
  backgroundColor: 'lightblue',
};

export default class Example extends React.Component {
  state = {
    showOverlay: false,
  };

  _onClick = () => {
    this.setState({
      showOverlay: !this.state.showOverlay,
    });
  };

  render() {
    return (
      <Layer
        properties={{ x: 0, y: 0, width: 375, height: 667 }}
        style={{ overflow: 'hidden' }}>
        <button onClick={this._onClick}>Toggle</button>
        <ReactTransitionGroup>
          {this.state.showOverlay &&
            <LayerTransitionChild
              enterProperties={{
                ...OverlayProperties,
                y: 667,
              }}
              properties={OverlayProperties}
              exitProperties={{
                ...OverlayProperties,
                x: 375,
              }}
              animator={SpringAnimator({ spring: 0.0001, friction: 0.02 })}
              key="overlay"
            />
          }
        </ReactTransitionGroup>
      </Layer>
    );
  }
}
