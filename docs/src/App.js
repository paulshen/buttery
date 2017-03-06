import React from 'react';
import Radium from 'radium';

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
        <div style={Styles.Body} />
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
    flex: 1,
  },
};
