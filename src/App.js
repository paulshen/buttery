/* @flow */
import React from 'react';
import Radium from 'radium';

class App extends React.Component {
  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
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
