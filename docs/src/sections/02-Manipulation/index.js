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
          surprises here! react-prototyper will watch for changes to a layer's
          frame and style.
        </Paragraph>
      </Section>
    </div>,
  App,
  Source,
};
