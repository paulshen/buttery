/* @flow */
import React from 'react';
import Radium from 'radium';

import { Layer, LayerDraggable } from './proto';

class App extends React.Component {
  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <LayerDraggable
            properties={{
              width: 1125,
              height: 667,
              x: 0,
              y: 0,
            }}
            initialX={0}
            initialY={0}
            viewportSize={{ width: 375, height: 667 }}
            pageSize={375}>
            <Layer
              properties={{
                width: 375,
                height: 667,
                x: 0,
                y: 0,
                backgroundColor: '#999999',
              }}
            />
            <Layer
              properties={{
                width: 375,
                height: 667,
                x: 375,
                y: 0,
                backgroundColor: '#cccccc',
              }}
            />
            <Layer
              properties={{
                width: 375,
                height: 667,
                x: 750,
                y: 0,
                backgroundColor: '#aaaaaa',
              }}
            />
          </LayerDraggable>
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
