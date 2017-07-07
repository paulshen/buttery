import React from 'react';
import { Section, Paragraph, InlineCode, Header, Table } from '../../components/Description';
import { DescriptionCode } from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Uber',
  description: () => (
    <div>
      <Section>
        <Paragraph>A prototype of Uber app interactions</Paragraph>
      </Section>
    </div>
  ),
  App,
  Source,
};
