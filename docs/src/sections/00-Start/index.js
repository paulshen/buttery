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
  name: 'Getting Started',
  description: () =>
    <div>
      <Section>
        <Header>Install</Header>
        <DescriptionCode>npm install buttery</DescriptionCode>
      </Section>
      <Section>
        <Header>Use</Header>
        <DescriptionCode>
{`import { Layer, Frame } from 'buttery';

render() {
  return <Layer frame={Frame(0, 0, 80, 80)} />;
}`}</DescriptionCode>
      </Section>
    </div>,
  App,
  Source,
};
