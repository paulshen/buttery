/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Constraint, Layer, LayerTransitionChild, SpringAnimator, LinearAnimator } from './proto';

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

  _onDrag = (p: Point) => {
  };

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
            properties={{
              x: 100,
              y: 200,
              width: 80,
              height: 80,
              backgroundColor: '#FE9D63',
              rotation: this.state.numClicks * 120,
              scaleX: this.state.numClicks % 2 === 0 ? 1 : 1.5,
              scaleY: this.state.numClicks % 2 === 0 ? 1 : 1.5,
              borderRadius: this.state.numClicks % 2 === 0 ? 2 : 10,
              shadowColor: 'rgba(0,0,0,0.15)',
              shadowBlur: this.state.numClicks % 2 === 1 ? 16 : 0,
              shadowSpread: this.state.numClicks % 2 === 1 ? 1 : 0,
            }}
            animator={new SpringAnimator()}
            onClick={this._onClick}
          />
          {this.state.showMenu &&
            <Layer properties={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              x: 0,
              y: 0,
              width: 375,
              height: 667,
              opacity: Math.max(Math.min(this.state.menuX / 175 + 1, 1), 0),
            }} />
          }
          <ReactTransitionGroup>
            {this.state.showMenu &&
              <LayerTransitionChild
                enterProperties={{
                  x: -375,
                  y: 0,
                  width: 375,
                  height: 667,
                }}
                properties={{
                  x: 0,
                  y: 0,
                  width: 375,
                  height: 667,
                }}
                exitProperties={{
                  x: -375,
                  y: 0,
                  width: 375,
                  height: 667,
                }}
                draggable={true}
                draggableProperties={{
                  constraintX: new Constraint({ min: -375, max: 0 }),
                }}
                animator={new SpringAnimator(0.0005, 0.05)}
                onDrag={this._onDrag}
                onMove={this._onMove}
                onDragEnd={this._onDragEnd}
                key="menu">
                <Layer
                  properties={{
                    backgroundColor: 'black',
                    x: 0,
                    y: 0,
                    width: 200,
                    height: 667,
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
}

document.addEventListener('touchmove', (e) => e.preventDefault());
