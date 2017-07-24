/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Layer, LayerTransitionChild, SpringAnimator, Frame } from 'buttery';

class App extends React.Component {
  state = {
    numClicks: 0,
  };

  _onClick = () => {
    this.setState({
      numClicks: (this.state.numClicks + 1) % 4,
    });
  };

  render() {
    let fromBottom = this.state.numClicks < 2;

    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            frame={Frame(100, 200, 80, 80)}
            properties={{
              backgroundColor: '#FE9D63',
              rotation: this.state.numClicks * 120,
              scaleX: this.state.numClicks % 2 === 0 ? 1 : 1.5,
              scaleY: this.state.numClicks % 2 === 0 ? 1 : 1.5,
              borderRadius: this.state.numClicks % 2 === 0 ? 2 : 10,
              shadowColor: 'rgba(0,0,0,0.15)',
              shadowBlur: this.state.numClicks % 2 === 1 ? 16 : 0,
              shadowSpread: this.state.numClicks % 2 === 1 ? 1 : 0,
            }}
            animator={SpringAnimator()}
            onClick={this._onClick}
          />
          <ReactTransitionGroup>
            {this.state.numClicks % 2 === 1 &&
              <LayerTransitionChild
                enterFrame={Frame(
                  fromBottom ? 0 : 375,
                  fromBottom ? 667 : 0,
                  375,
                  667
                )}
                frame={Frame(0, 0, 375, 667)}
                exitFrame={Frame(
                  fromBottom ? 0 : 375,
                  fromBottom ? 667 : 0,
                  375,
                  667
                )}
                properties={{
                  backgroundColor: 'blue',
                }}
                animator={SpringAnimator({ spring: 0.0005, friction: 0.05 })}
                onClick={this._onClick}
                key={fromBottom}
              />}
          </ReactTransitionGroup>
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
