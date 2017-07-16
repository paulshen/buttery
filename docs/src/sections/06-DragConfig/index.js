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
  name: 'Drag Config',
  description: () =>
    <div>
      <Section>
        <Paragraph>
          <InlineCode>Drag</InlineCode> accepts an optional config property.
        </Paragraph>
        <DescriptionCode>
          {`<Layer
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
        <Paragraph>All properties are optional.</Paragraph>
        <Table>
          <tr>
            <td>Prop</td>
            <td>Type</td>
            <td>Notes</td>
          </tr>
          <tr>
            <td>
              <InlineCode>min</InlineCode>
            </td>
            <td>?number</td>
            <td>Min value constraint</td>
          </tr>
          <tr>
            <td>
              <InlineCode>max</InlineCode>
            </td>
            <td>?number</td>
            <td>Max value constraint</td>
          </tr>
          <tr>
            <td>
              <InlineCode>bounce</InlineCode>
            </td>
            <td>?boolean</td>
            <td>
              If <InlineCode>true</InlineCode>, the value can exceed the
              constraints with elastic behavior.
            </td>
          </tr>
          <tr>
            <td>
              <InlineCode>momentum</InlineCode>
            </td>
            <td>?boolean</td>
            <td>
              If <InlineCode>true</InlineCode>, the layer will move with
              momentum after end of drag.
            </td>
          </tr>
        </Table>
      </Section>
    </div>,
  App,
  Source,
  folds: [],
};
