import React from 'react';
import Radium from 'radium';

import { Section, Paragraph, InlineCode, Header } from '../../components/Description';
import CodeComponent from '../../Code';
import Code from './Code';
import App from './App';

export default {
  name: 'Layers',
  description: () => (
    <div>
      <Section>
        <Paragraph>Layers are the building blocks of Wasabi. Use them as <InlineCode>{`<div>`}</InlineCode>s whose styles and position are controlled by Wasabi.</Paragraph>
        <Paragraph>Layers are absolutely positioned by Wasabi. This allows Wasabi to optimize performance by skipping the browser's layout computations.</Paragraph>
        <Paragraph>All layers must have the prop <InlineCode>properties</InlineCode> set. This is a style-like object that Wasabi uses to style and position your layer.</Paragraph>
      </Section>
      <Header>LayerProperties</Header>
      <CodeComponent>
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
      </CodeComponent>
    </div>
  ),
  App,
  Code,
};
