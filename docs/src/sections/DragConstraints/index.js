import React from 'react';
import {
  Section,
  Paragraph,
  InlineCode,
  Header,
  Table
} from '../../components/Description';
import { DescriptionCode } from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Drag Constraints',
  description: () =>
    <div>
      <Section>
        <Paragraph>
          Drag values accept an optional config property.
        </Paragraph>
        <DescriptionCode>
          {`type DragConfig = {
  min?: number,
  max?: number,
  bounce?: boolean,
  momentum?: boolean,
};

<Layer
  frame={Frame(
    Drag(100, { min: 0, max: 200 }),
    Drag(200, { min: 0, max: 200 }),
    100,
    100,
  )}
/>`}
        </DescriptionCode>
      </Section>
      <Section>
        <Header>DragConfig</Header>
        <Paragraph>All properties are optional</Paragraph>
        <Table>
          <tr>
            <td>Prop</td>
            <td>Notes</td>
          </tr>
          <tr>
            <td>
              <InlineCode>min</InlineCode>
            </td>
            <td>number</td>
          </tr>
          <tr>
            <td>
              <InlineCode>max</InlineCode>
            </td>
            <td>number</td>
          </tr>
          <tr>
            <td>
              <InlineCode>bounce</InlineCode>
            </td>
            <td>boolean</td>
          </tr>
          <tr>
            <td>
              <InlineCode>momentum</InlineCode>
            </td>
            <td>boolean</td>
          </tr>
        </Table>
      </Section>
    </div>,
  App,
  Source,
  folds: [],
};
