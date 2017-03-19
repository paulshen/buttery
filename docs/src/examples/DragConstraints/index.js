import React from 'react';
import { Section, Paragraph, InlineCode, Header, Table } from '../../components/Description';
import Code from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Drag Constraints',
  description: () => (
    <div>
      <Section>
        <Paragraph>Draggable layers support an optional <InlineCode>draggableProps</InlineCode> property for configuring draggable behavior.</Paragraph>
        <Code>
{`import { Layer, DragConstraint } from 'proto';

<Layer
  draggable={true}
  draggableProps={{
    constraintX: DragConstraint({ min: 0, max: 100 }),
    constraintY: DragConstraint({ min: 50, max: 50 }),
  }}
/>`}
        </Code>
      </Section>
      <Section>
        <Header>Draggable Props</Header>
        <Paragraph>All props are optional</Paragraph>
        <Table>
          <tr><td>Prop</td><td>Notes</td></tr>
          <tr><td><InlineCode>constraintX</InlineCode></td><td>Use <InlineCode>DragConstraint</InlineCode> to constrain x values</td></tr>
          <tr><td><InlineCode>constraintY</InlineCode></td><td>Use <InlineCode>DragConstraint</InlineCode> to constrain y values</td></tr>
          <tr><td><InlineCode>momentum</InlineCode></td><td>See DragMomentum</td></tr>
        </Table>
      </Section>
    </div>
  ),
  App,
  Source,
};
