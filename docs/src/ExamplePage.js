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
      <div><Link to="/example/dragmomentum">Drag Momentum</Link></div>
      <div><Link to="/example/scroll">Scroll</Link></div>
      <div><Link to="/example/layertransitionchild">LayerTransitionChild</Link></div>
    </div>
  );
}
Nav = Radium(Nav);

function StatusLink({ children, to }, { router }) {
  return (
    <Link to={to} style={Styles.StatusLink}>
      {children}
      {router.location.pathname === to && <div style={Styles.StatusLinkStrike} />}
    </Link>
  );
}
StatusLink.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

class ExamplePage extends React.Component {
  render() {
    let { view } = this.props.route;

    let exampleName = this.props.params.exampleName || 'layers';
    let example = Examples[exampleName];
    let exampleKeys = Object.keys(Examples);
    let exampleIndex = exampleKeys.indexOf(exampleName);
    let prevExampleName = exampleIndex > 0 ? exampleKeys[exampleIndex - 1] : null;
    let nextExampleName = exampleIndex < exampleKeys.length - 2 ? exampleKeys[exampleIndex + 1] : null;

    return (
      <div style={Styles.Root}>
        <Nav />
        <div style={Styles.Body}>
          <div style={Styles.BodyColumn}>
              <div style={Styles.DescriptionBody}>
                <div>
                  {prevExampleName && <StatusLink to={`/example/${prevExampleName}`}>Previous</StatusLink>}
                  {nextExampleName && <StatusLink to={`/example/${nextExampleName}`}>Next</StatusLink>}
                </div>
                <div>
                  <StatusLink to={`/example/${this.props.params.exampleName}`}>Description</StatusLink>
                  <StatusLink to={`/example/${this.props.params.exampleName}/code`}>Code</StatusLink>
                </div>
                <div style={Styles.ExampleName}>{example.name}</div>
                {view === 'description' && <div style={Styles.Description}>{example.description && example.description()}</div>}
              </div>
              {view === 'code' && <div style={Styles.ExampleCode}><Code foldGutter={true}>{example.Source}</Code></div>}
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
  DescriptionColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  DescriptionBody: {
    alignSelf: 'center',
    paddingTop: '100px',
    width: '60%',
  },
  Description: {
    fontSize: '16px',
    fontWeight: 300,
    letterSpacing: '0.2px',
    lineHeight: 1.5,
    paddingBottom: '100px',
  },
  ExampleName: {
    fontSize: '24px',
    letterSpacing: '1px',
    marginBottom: '36px',
  },
  ExampleCode: {
    flex: 1,
  },
  StatusLink: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.2,
    position: 'relative',
    textDecoration: 'none',
  },
  StatusLinkStrike: {
    backgroundColor: '#000000',
    height: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 8,
  },
};
