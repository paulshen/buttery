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
  name: 'Drag Momentum',
  description: () =>
    <div>
      <Section>
        <Paragraph>
          Dragged values support momentum behavior at the end of drag events. If
          the drag ends with some velocity, the layer will continue to move as
          it slows down to a stop.
        </Paragraph>
        <DescriptionCode>
          {`Drag(value, { momentum: true })`}
        </DescriptionCode>
      </Section>
      <Section>
        <Header>Bouncy drag behavior</Header>
        <Paragraph>
          If a drag configuration sets <InlineCode>bounce</InlineCode> to{' '}
          <InlineCode>true</InlineCode> and a constraint (<InlineCode>min</InlineCode>{' '}
          and/or <InlineCode>max</InlineCode>), the layer will bounce if the
          layer is dragged past the boundary.
        </Paragraph>
        <DescriptionCode>
          {`Drag(this.state.x, { min: 0, max: 200, bounce: true })`}
        </DescriptionCode>
        <Paragraph>
          Fling the square against the constraints to see the momentum and
          bounce behavior.
        </Paragraph>
      </Section>
    </div>,
  App,
  Source,
  folds: [],
};
