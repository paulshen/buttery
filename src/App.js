/* @flow */
import React from 'react';
import Radium from 'radium';

import { Layer } from './proto';

class App extends React.Component {
  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer
            width={100}
            height={100}
            x={40}
            y={100}
            style={Styles.Fill}
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
  Fill: {
    backgroundColor: '#4990E2',
    borderRadius: '2px',
  },
}
