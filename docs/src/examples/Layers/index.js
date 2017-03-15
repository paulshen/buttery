import React from 'react';
import Radium from 'radium';

import Code from './Code';
import App from './App';

const Section = (props) => <div {...props} style={Section.Styles} />;
Section.Styles = {
  marginBottom: '32px',
};

const Header = (props) => <div {...props} style={Header.Styles} />;
Header.Styles = {
  fontSize: '20px',
  fontWeight: 400,
  letterSpacing: '0.8px',
};

const Paragraph = (props) => <div {...props} style={Paragraph.Styles} />;
Paragraph.Styles = {
  marginBottom: '16px',
};

export default {
  name: 'Layers',
  description: () => (
    <div>
      <Section>
        <Paragraph>{`Layers are the building blocks of Wasabi. Use them as <div>s whose styles and position are controlled by Wasabi.`}</Paragraph>
        <Paragraph>Layers are absolutely positioned by Wasabi. This allows Wasabi to optimize performance by skipping the browser's layout computations.</Paragraph>
        <Paragraph>All layers must have the prop `properties` set. This is a style-like object that Wasabi uses to style and position your layer.</Paragraph>
      </Section>
      <Header>LayerProperties</Header>
      <pre>
{`type LayerProperties = {
  x: number,
  y: number,
  width: number,
  height: number,
  backgroundColor?: string,
  opacity?: number,
  rotation?: number,
  scaleX?: number,
  scaleY?: number,
  scale?: number,
  borderRadius?: number,
  shadowX?: ?number,
  shadowY?: ?number,
  shadowBlur?: ?number,
  shadowColor?: ?string,
  shadowSpread?: ?number,
};`}
      </pre>
    </div>
  ),
  App,
  Code,
};
