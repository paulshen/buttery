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
    <div style={Styles.Phone}>
      <div style={Styles.Example}>
        <e.App />
      </div>
    </div>
  );
}
Example = Radium(Example);

class HomePage extends React.Component {
  render() {
    return (
      <div style={Styles.Root}>
        <div>
          <Header>react-prototyper</Header>
          <Paragraph>
            a React library for building animations and interactions.
          </Paragraph>
          <Paragraph>
            <div><Link to="/docs">Documentation</Link></div>
          </Paragraph>
          <Paragraph>
            <div><Link to="/example/basic">Basic</Link></div>
            <div><Link to="/example/sidemenu">Side Menu</Link></div>
            <div><Link to="/example/pulltorefresh">Pull to Refresh</Link></div>
            <div><Link to="/example/overlay">Overlay</Link></div>
            <div><Link to="/example/cards">Cards</Link></div>
          </Paragraph>
        </div>
        <div style={Styles.PhoneColumn}>
          <Route path={`/example/:exampleId`} component={Example} />
        </div>
      </div>
    );
  }
}
export default Radium(HomePage);

const Styles = {
  Root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '64px',
  },
  PhoneColumn: {
    height: `${897 * 0.8}px`,
    width: `${440 * 0.8}px`,
  },
  Phone: {
    alignItems: 'center',
    backgroundImage: 'url(http://origami.design/public/images/devices/iPhone7-White.png)',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    height: '897px',
    justifyContent: 'center',
    transform: `scale(${0.8})`,
    transformOrigin: 'top left',
    width: '440px',
  },
  Example: {
    backgroundColor: '#ffffff',
    height: '667px',
    overflow: 'hidden',
    position: 'relative',
    width: '375px',
  },
};
