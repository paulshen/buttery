/* @flow */
import React from 'react';
import Radium from 'radium';

import { Layer, LayerDraggable } from './proto';

class App extends React.Component {
  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            properties={{
              backgroundColor: '#438DED',
              width: 100,
              height: 100,
              x: 100,
              y: 100,
            }}
          />
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
