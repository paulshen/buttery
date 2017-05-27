import React from 'react';
import Radium from 'radium';

import Code from './Code';
import Output from './Output';
import Examples from './examples';
import Link from './components/Link';

function StatusLink({ children, to, style }, { router }) {
  return (
    <Link to={to} style={[Styles.StatusLink, style]}>
      {children}
      {router.location.pathname === to &&
        <div style={Styles.StatusLinkStrike} />}
    </Link>
  );
}
StatusLink.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
StatusLink = Radium(StatusLink);

function Nav() {
  return (
    <div style={Styles.Nav}>
      <div><StatusLink to="/example/layers">Layers</StatusLink></div>
      <div>
        <StatusLink to="/example/manipulation">Manipulation</StatusLink>
      </div>
      <div><StatusLink to="/example/animator">Animator</StatusLink></div>
      <div><StatusLink to="/example/draggable">Draggable</StatusLink></div>
      <div>
        <StatusLink to="/example/draggableevents">Draggable Events</StatusLink>
      </div>
      <div>
        <StatusLink to="/example/dragconstraints">Drag Constraints</StatusLink>
      </div>
      <div>
        <StatusLink to="/example/draggablemomentum">
          Draggable Momentum
        </StatusLink>
      </div>
      <div><StatusLink to="/example/scroll">Scroll</StatusLink></div>
      <div>
        <StatusLink to="/example/layertransitionchild">
          LayerTransitionChild
        </StatusLink>
      </div>
      <div><StatusLink to="/example/uber">Uber</StatusLink></div>
    </div>
  );
}
Nav = Radium(Nav);

class ExamplePage extends React.Component {
  render() {
    let { view } = this.props.route;

    let exampleName = this.props.params.exampleName || 'layers';
    let example = Examples[exampleName];
    let exampleKeys = Object.keys(Examples);
    let exampleIndex = exampleKeys.indexOf(exampleName);
    let prevExampleKey = exampleIndex > 0
      ? exampleKeys[exampleIndex - 1]
      : null;
    let nextExampleKey = exampleIndex < exampleKeys.length - 1
      ? exampleKeys[exampleIndex + 1]
      : null;

    return (
      <div style={Styles.Root}>
        <Nav />
        <div style={Styles.Body}>
          <div style={[Styles.BodyColumn, Styles.TextColumn]}>
            <div style={Styles.ExampleNavigator}>
              {prevExampleKey &&
                <StatusLink to={`/example/${prevExampleKey}`}>
                  &larr; {Examples[prevExampleKey].name}
                </StatusLink>}
              {nextExampleKey &&
                <StatusLink to={`/example/${nextExampleKey}`}>
                  {Examples[nextExampleKey].name} &rarr;
                </StatusLink>}
            </div>
            <div style={Styles.DescriptionBody}>
              <div style={Styles.ExampleName}>{example.name}</div>
              <div style={Styles.ExampleSwitcher}>
                <StatusLink
                  to={`/example/${this.props.params.exampleName}`}
                  style={Styles.ExampleSwitcherLink}
                >
                  Description
                </StatusLink>
                <StatusLink
                  to={`/example/${this.props.params.exampleName}/code`}
                  style={Styles.ExampleSwitcherLink}
                >
                  Code
                </StatusLink>
              </div>
              {view === 'description' &&
                <div style={Styles.Description}>
                  {example.description && example.description()}
                </div>}
            </div>
            {view === 'code' &&
              <div style={Styles.ExampleCode}>
                <Code showGutter={true} foldGutter={true} folds={example.folds}>
                  {example.Source}
                </Code>
              </div>}
          </div>
          <div style={[Styles.BodyColumn, Styles.OutputColumn]}>
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
  },
  TextColumn: {
    flex: 1,
  },
  OutputColumn: {
    maxWidth: 375 + 120,
    width: '50%',
  },
  DescriptionColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  DescriptionBody: {
    paddingLeft: '80px',
    paddingRight: '80px',
    paddingTop: '80px',
  },
  Description: {
    fontSize: '16px',
    fontWeight: 300,
    letterSpacing: '0.2px',
    lineHeight: 1.5,
    paddingBottom: '100px',
  },
  ExampleNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px',
  },
  ExampleName: {
    fontSize: '24px',
    letterSpacing: '1px',
  },
  ExampleSwitcher: {
    marginBottom: '32px',
  },
  ExampleSwitcherLink: {
    marginRight: '20px',
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
