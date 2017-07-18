/* @flow */
import React from 'react';
import Radium from 'radium';
import { Route, Link } from 'react-router-dom';

import {
  Section,
  Paragraph,
  InlineCode,
  Header
} from './components/Description';
import Examples from './examples';

function Example({ match }) {
  let e = Examples[match.params.exampleId];
  return (
    <div style={Styles.Example}>
      <e.App />
    </div>
  );
}

class HomePage extends React.Component {
  render() {
    return (
      <div style={Styles.Root}>
        <Header>react-prototyper</Header>
        <Paragraph>
          a React library for building animations and interactions.
        </Paragraph>
        <Paragraph>
          <div><Link to="/docs">Documentation</Link></div>
          <div><Link to="/example/basic">Basic</Link></div>
          <div><Link to="/example/sidemenu">Side Menu</Link></div>
          <div><Link to="/example/pulltorefresh">Pull to Refresh</Link></div>
          <div><Link to="/example/overlay">Overlay</Link></div>
        </Paragraph>
        <Route path={`/example/:exampleId`} component={Example} />
      </div>
    );
  }
}
export default Radium(HomePage);

const Styles = {
  Root: {
    padding: '64px',
  },
  Example: {
    backgroundColor: '#def5f0',
    height: '360px',
    width: '360px',
  },
};
