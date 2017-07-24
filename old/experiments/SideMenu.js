/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import {
  DragConstraint,
  Layer,
  LayerTransitionChild,
  SpringAnimator,
  Frame
} from 'buttery';

class App extends React.Component {
  state = {
    numClicks: 0,
    showMenu: false,
    menuX: -375,
  };

  _onClick = () => {
    this.setState({
      numClicks: (this.state.numClicks + 1) % 2,
      showMenu: !this.state.showMenu,
    });
  };

  _onDrag = () => {};

  _onMove = (p: Point) => {
    this.setState({
      menuX: p.x,
    });
  };

  _onDragEnd = (p: Point) => {
    if (p.x < -80) {
      this.setState({
        showMenu: false,
      });
    }
  };

  render() {
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
          {this.state.showMenu &&
            <Layer
              frame={Frame(0, 0, 375, 667)}
              properties={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                opacity: Math.max(Math.min(this.state.menuX / 175 + 1, 1), 0),
              }}
            />}
          <ReactTransitionGroup>
            {this.state.showMenu &&
              <LayerTransitionChild
                enterFrame={Frame(-375, 0, 375, 667)}
                frame={Frame(0, 0, 375, 667)}
                exitFrame={Frame(-375, 0, 375, 667)}
                draggable={true}
                draggableProperties={{
                  constraintX: DragConstraint({ min: -375, max: 0 }),
                  constraintY: DragConstraint({ min: 0, max: 0 }),
                }}
                animator={SpringAnimator({ spring: 0.0005, friction: 0.05 })}
                onDrag={this._onDrag}
                onMove={this._onMove}
                onDragEnd={this._onDragEnd}
                key="menu"
              >
                <Layer
                  frame={Frame(0, 0, 200, 667)}
                  properties={{
                    backgroundColor: 'black',
                  }}
                />
              </LayerTransitionChild>}
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
