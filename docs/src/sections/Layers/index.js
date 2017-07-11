import React from 'react';
import {
  Section,
  Paragraph,
  InlineCode,
  Header
} from '../../components/Description';
import { DescriptionCode } from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Layers',
  description: () =>
    <div>
      <Section>
        <Paragraph>
          Layers are the building blocks of Wasabi. Use them as you would{' '}
          <InlineCode>{`<div>`}</InlineCode>s.
        </Paragraph>
        <Paragraph>
          All layers must have the prop <InlineCode>frame</InlineCode>, which is
          an object with numbers <InlineCode>x</InlineCode>, <InlineCode>y</InlineCode>,{' '}
          <InlineCode>width</InlineCode>, and <InlineCode>height</InlineCode>.
          Additionally, layers can optionally set{' '}
          <InlineCode>properties</InlineCode> which includes other style
          properties that can be animated.
        </Paragraph>
        <Paragraph>
          Layers are absolutely positioned by Wasabi. This allows Wasabi to
          optimize performance by skipping the browser's layout computations.
        </Paragraph>
      </Section>
      <Header>LayerProperties</Header>
      <DescriptionCode>
        {`type Rect = {
  x: number,
  y: number,
  width: number,
  height: number,
}

type AnimatedProperties = {
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
      </DescriptionCode>
    </div>,
  App,
  Source,
};
