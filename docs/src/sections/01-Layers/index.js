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
          Layers are the building blocks of react-prototyper. Use them as you
          would <InlineCode>{`<div>`}</InlineCode>s. All layers must have the
          prop <InlineCode>frame</InlineCode>, which is an object with
          properties <InlineCode>x</InlineCode>, <InlineCode>y</InlineCode>,{' '}
          <InlineCode>width</InlineCode>, and <InlineCode>height</InlineCode>.
        </Paragraph>
        <Paragraph>
          Layers are absolutely positioned by react-prototyper. This allows
          react-prototyper to optimize performance by skipping the browser's
          layout computations.
        </Paragraph>
      </Section>
      <DescriptionCode>
        {`<Layer
  frame={{
    x: 100,
    y: 100,
    width: 200,
    height: 200
  }}
/>

// or equivalently with Frame() helper
<Layer frame={Frame(100, 100, 200, 200)} />`}
      </DescriptionCode>
      <Section>
        <Paragraph>
          Layers support DOM inline styles. <InlineCode>transform</InlineCode>,{' '}
          <InlineCode>width</InlineCode>, and <InlineCode>height</InlineCode>{' '}
          are controlled by react-prototyper and should not be set in{' '}
          <InlineCode>style</InlineCode>. The following properties are also
          supported as properties of <InlineCode>style</InlineCode>:{' '}
          <InlineCode>rotate</InlineCode>, <InlineCode>scale</InlineCode>,{' '}
          <InlineCode>scaleX</InlineCode>, <InlineCode>scaleY</InlineCode>.
        </Paragraph>
        <DescriptionCode>
          {`<Layer
  frame={Frame(100, 100, 200, 200)}
  style={{
    opacity: 0.5,
    scale: 2
  }}
/>`}
        </DescriptionCode>
      </Section>
    </div>,
  App,
  Source,
};
