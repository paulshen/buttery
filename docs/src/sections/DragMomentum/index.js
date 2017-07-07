import React from 'react';
import { Section, Paragraph, InlineCode, Header, Table } from '../../components/Description';
import { DescriptionCode } from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Drag Momentum',
  description: () => (
    <div>
      <Section>
        <Paragraph>Layers can have momentum behavior at the end of drag events.</Paragraph>
        <DescriptionCode>
{`<Layer
  draggable={true}
  draggableProps={{
    momentum: true,
  }}
/>`}
        </DescriptionCode>
      </Section>
      <Section>
        <Header>Bouncy drag constraints</Header>
        <Paragraph>Drag constraints combined with momentum can emulate scroll, paging, and other behaviors.</Paragraph>
        <Paragraph>Setting a DragConstraint's <InlineCode>bounce</InlineCode> prop to <InlineCode>true</InlineCode> will allow the layer to overshoot and act as a spring.</Paragraph>
        <DescriptionCode>
{`<Layer
  draggable={true}
  draggableProps={{
    constraintX: DragConstraint({
      min: 0, max: 100, bounce: true
    }),
    momentum: true,
  }}
/>`}
        </DescriptionCode>
        <Paragraph>Fling the square against the constraints to see the momentum and bounce behavior.</Paragraph>
      </Section>
    </div>
  ),
  App,
  Source,
  folds: [],
};
