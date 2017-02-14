/* @flow */
import React from 'react';
import Radium from 'radium';
import ReactTransitionGroup from 'react-addons-transition-group';

import { Constraint, Layer, LayerTransitionChild, SpringAnimator, LinearAnimator } from '../proto';

class App extends React.Component {
  state: {
    constraintY: Constraint,
    scrollY: number,
    transitionLayerProperties: ?LayerProperties,
    transitionExit: boolean,
  } = {
    constraintY: new Constraint({ min: 587 - 2000, max: 0, edge: 'bounce' }),
    scrollY: 0,
    transitionLayerProperties: null,
    transitionExit: false,
  };
  _scrollLayer: Layer;
  _transitionLayer: Layer;

  _onDragEnd = (p: Point) => {
    this.setState({ scrollY: p.y });
  };

  _onClick = () => {
    if (this.state.transitionLayerProperties) {
      this.setState({
        transitionExit: true,
      });
    } else {
      let properties = this._transitionLayer.getProperties();
      let scrollProperties = this._scrollLayer.getProperties();
      properties.x += scrollProperties.x;
      properties.y += scrollProperties.y;
      this.setState({
        transitionLayerProperties: properties,
      });
    }
  };

  _onExit = () => {
    this.setState({
      transitionLayerProperties: null,
      transitionExit: false,
    });
  };

  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            properties={{ x: 0, y: this.state.scrollY, width: 375, height: 2000 }}
            draggable={true}
            draggableProperties={{
              constraintX: new Constraint({ min: 0, max: 0 }),
              constraintY: this.state.constraintY,
              momentum: true,
            }}
            onDragEnd={this._onDragEnd}
            animator={new SpringAnimator(0.0001, 0.02)}
            ref={c => this._scrollLayer = c}
          >
            <Layer
              properties={{ x: 0 , y: 0, width: 375, height: 300, backgroundColor: `rgb(255,153,153)` }}
            />
            <Layer
              properties={{ x: 0 , y: 300, width: 375, height: 300, backgroundColor: `rgb(200,153,153)` }}
            />
            {!this.state.transitionLayerProperties &&
              <Layer
                properties={{ x: 0 , y: 600, width: 375, height: 300, backgroundColor: `rgb(153,255,153)` }}
                onClick={this._onClick}
                ref={c => this._transitionLayer = c}
              />}
            <Layer
              properties={{ x: 0 , y: 900, width: 375, height: 300, backgroundColor: `rgb(153,153,200)` }}
            />
            <Layer
              properties={{ x: 0 , y: 1200, width: 375, height: 300, backgroundColor: `rgb(153,200,153)` }}
            />
          </Layer>
          <ReactTransitionGroup>
            {this.state.transitionLayerProperties && !this.state.transitionExit &&
              <LayerTransitionChild
                enterProperties={this.state.transitionLayerProperties}
                properties={{ ...this.state.transitionLayerProperties, y: 0, height: 200 }}
                exitProperties={this.state.transitionLayerProperties}
                animator={new SpringAnimator()}
                onClick={this._onClick}
                onExit={this._onExit}
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
