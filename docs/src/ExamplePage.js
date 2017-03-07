import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import Code from './Code';
import Output from './Output';
import Examples from './examples';

function Nav() {
  return (
    <div style={Styles.Nav}>
      <div><Link to="/example/layers">Layers</Link></div>
      <div><Link to="/example/manipulation">Manipulation</Link></div>
      <div><Link to="/example/animator">Animator</Link></div>
      <div><Link to="/example/draggable">Draggable</Link></div>
      <div><Link to="/example/draggableondragend">Draggable onDragEnd</Link></div>
      <div><Link to="/example/dragconstraints">Drag Constraints</Link></div>
    </div>
  );
}
Nav = Radium(Nav);

class ExamplePage extends React.Component {
  render() {
    let example = Examples[this.props.params.exampleName] || Examples['layers'];
    return (
      <div style={Styles.Root}>
        <Nav />
        <div style={Styles.Body}>
          <div style={[Styles.BodyColumn, Styles.CodeColumn]}>
            <div style={Styles.ExampleName}>{example.name}</div>
            <Code>{example.Code}</Code>
          </div>
          <div style={Styles.BodyColumn}>
            <Output><example.App /></Output>
          </div>
        </div>
      </div>
    );
  }
}
export default Radium(ExamplePage);

const Styles = {
  Root: {
    display: 'flex',
    height: '100vh',
  },
  Nav: {
    backgroundColor: '#f8f8f8',
    boxSizing: 'border-box',
    fontSize: '14px',
    paddingLeft: '40px',
    paddingTop: '80px',
    width: '280px',
  },
  Body: {
    boxShadow: '0 0 16px 0 rgba(0,0,0,0.02)',
    display: 'flex',
    flex: 1,
  },
  BodyColumn: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '50%',
  },
  CodeColumn: {
    paddingBottom: '60px',
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
