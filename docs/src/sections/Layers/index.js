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
          would <InlineCode>{`<div>`}</InlineCode>s.
        </Paragraph>
        <Paragraph>
          All layers must have the prop <InlineCode>frame</InlineCode>, which is
          an object with numbers <InlineCode>x</InlineCode>,{' '}
          <InlineCode>y</InlineCode>, <InlineCode>width</InlineCode>, and{' '}
          <InlineCode>height</InlineCode>.
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

<Layer frame={Frame(100, 100, 200, 200)} />`}
      </DescriptionCode>
    </div>,
  App,
  Source,
};
