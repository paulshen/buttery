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
  name: 'Manipulation',
  description: () =>
    <div>
      <Section>
        <Paragraph>
          Layers can be updated just like any other React component. No
          surprises here!
        </Paragraph>
        <Paragraph>
          For performance, react-prototyper does a deep equality test on{' '}
          <InlineCode>LayerProperties</InlineCode> to determine whether to
          update the layer.
        </Paragraph>
      </Section>
      <DescriptionCode>
        {`<Layer
  frame={MyFrames[this.state.index]}
/>`}
      </DescriptionCode>
    </div>,
  App,
  Source,
};
