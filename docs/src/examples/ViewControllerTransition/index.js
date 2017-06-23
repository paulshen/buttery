import React from 'react';
import { Section, Paragraph, InlineCode, Header, Table } from '../../components/Description';
import { DescriptionCode } from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'View Controller Transition',
  description: () => (
    <div>
      <Section>
        <Paragraph>Use LayerTransitionChild to create flows</Paragraph>
      </Section>
    </div>
  ),
  App,
  Source,
};
