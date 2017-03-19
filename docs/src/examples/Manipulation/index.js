import React from 'react';

import { Section, Paragraph, InlineCode, Header } from '../../components/Description';
import Code from '../../Code';
import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Manipulation',
  description: () => (
    <div>
      <Section>
        <Paragraph>Layers can be updated just like any other React component. No surprises here!</Paragraph>
        <Paragraph>For performance, Wasabi does a property-level equality check to determine whether to update.</Paragraph>
      </Section>
      <Code>
{`<Layer
  properties={MyProperties[this.state.index]}
/>`}
      </Code>
    </div>
  ),
  App,
  Source,
};
