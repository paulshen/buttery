import React from 'react';
import { Section, Paragraph, InlineCode, Header } from '../../components/Description';
import { DescriptionCode } from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Draggable',
  description: () => (
    <div>
      <Section>
        <Paragraph>It's easy to make a layer draggable.</Paragraph>
        <DescriptionCode>
{`<Layer
  properties={...}
  draggable={true}
/>`}
        </DescriptionCode>
      </Section>
      <Section>
        <Paragraph>While a layer is dragged, its position is controlled by the draggable. When the drag ends, position control is returned to the owner.</Paragraph>
        <Paragraph>Try dragging the example layer. What happens when you finish dragging?</Paragraph>
      </Section>
    </div>
  ),
  App,
  Source,
  folds: [9],
};
