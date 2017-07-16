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
          the drag ends with velocity, the layer will continue to move until it
          slows down to a stop. This is often combined with{' '}
          <InlineCode>bounce</InlineCode> to emulate{' '}
          <a href="https://developer.apple.com/documentation/uikit/uiscrollview/1619420-bounces">
            iOS bounce behavior
          </a>.
        </Paragraph>
      </Section>
      <Section>
        <DescriptionCode>
          {`Drag(x, { min: 0, max: 200, bounce: true, momentum: true })`}
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
