import React from 'react';
import {
  Layer,
  LayerTransitionChild,
  Frame,
  Animated,
  Drag,
  spring,
  timed
} from 'buttery';
import ReactTransitionGroup from 'react-addons-transition-group';

export default class Example extends React.Component {
  state = {
    showOverlay: false,
    index: 1,
    method: 'slide',
  };

  _toggleOverlay = method => {
    let wasShown = !!this.state.showOverlay;
    this.setState({ method }, () => {
      this.setState({
        showOverlay: !wasShown,
        index: wasShown ? this.state.index : this.state.index + 1,
      });
    });
  };

  render() {
    let { method, index } = this.state;
    return (
      <Layer frame={Frame(0, 0, 375, 667)} style={{ overflow: 'hidden' }}>
        <div style={{ position: 'absolute' }}>
          <button onClick={() => this._toggleOverlay('slide')}>
            Slide Overlay
          </button>
          <button onClick={() => this._toggleOverlay('fade')}>
            Fade Overlay
          </button>
        </div>
        <ReactTransitionGroup>
          {this.state.showOverlay &&
            <LayerTransitionChild
              frame={Frame(20, Animated(447, spring(170, 26)), 335, 200)}
              enterFrame={method === 'slide' && { y: 667 }}
              exitFrame={
                method === 'slide' && { y: Animated(667, spring(170, 26)) }
              }
              style={{
                backgroundColor: '#49c6ae',
                borderRadius: 8,
                opacity: Animated(1, timed(300)),
              }}
              enterStyle={method === 'fade' && { opacity: 0 }}
              exitStyle={
                method === 'fade' && { opacity: Animated(0, timed(300)) }
              }
              key={`overlay${index}`}
            />}
        </ReactTransitionGroup>
      </Layer>
    );
  }
}
