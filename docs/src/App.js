import React from 'react';
import Radium from 'radium';

import Code from './Code';
import Output from './Output';
import ExampleLayers from './examples/Layers';

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
          <div style={[Styles.BodyColumn, Styles.CodeColumn]}>
            <div style={Styles.ExampleName}>{ExampleLayers.name}</div>
            <Code>{ExampleLayers.Code}</Code>
          </div>
          <div style={Styles.BodyColumn}>
            <Output><ExampleLayers.App /></Output>
          </div>
        </div>
      </div>
    );
  }
}
export default Radium(App);

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
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  CodeColumn: {
    paddingLeft: '60px',
    paddingRight: '60px',
    paddingTop: '80px',
  },
  ExampleName: {
    fontSize: '24px',
    letterSpacing: '1px',
    marginBottom: '36px',
  },
};
