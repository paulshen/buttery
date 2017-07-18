/* @flow */
import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';

import {
  Section,
  Paragraph,
  InlineCode,
  Header
} from './components/Description';

class HomePage extends React.Component {
  render() {
    return (
      <div style={Styles.Root}>
        <Header>react-prototyper</Header>
        <Paragraph>
          a React library for building animations and interactions.
        </Paragraph>
        <Paragraph>
          <Link to="/docs">Documentation</Link>
        </Paragraph>
      </div>
    );
  }
}
export default Radium(HomePage);

const Styles = {
  Root: {
    padding: '64px',
  },
};
