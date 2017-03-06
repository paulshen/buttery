import React from 'react';
import Radium from 'radium';

import Code from './Code';
import Output from './Output';

function Nav() {
  return (
    <div style={Styles.Nav}>
    </div>
  );
}
Nav = Radium(Nav);

class App extends React.Component {
  render() {
    return (
      <div style={Styles.Root}>
        <Nav />
        <div style={Styles.Body}>
          <div style={Styles.BodyColumn}>
            <Code />
          </div>
          <div style={Styles.BodyColumn}>
            <Output />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const Styles = {
  Root: {
    display: 'flex',
    height: '100vh',
  },
  Nav: {
    backgroundColor: '#f8f8f8',
    width: '240px',
  },
  Body: {
    boxShadow: '0 0 16px 0 rgba(0,0,0,0.02)',
    display: 'flex',
    flex: 1,
  },
  BodyColumn: {
    flex: 1,
  },
};
