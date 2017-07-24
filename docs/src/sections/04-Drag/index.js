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
  name: 'Drag',
  description: () =>
    <div>
      <Section>
        <Paragraph>It's easy to make a layer draggable.</Paragraph>
        <DescriptionCode>
          {`import { Drag } from 'buttery';

Drag(value: number | AnimatedValue, config?: DragConfig)

// X draggable (y is fixed at 160)
<Layer frame={Frame(Drag(120), 160, 80, 80)} />

// both X and Y draggable
<Layer frame={Frame(Drag(120), Drag(160), 80, 80)} />`}
        </DescriptionCode>
      </Section>
      <Section>
        <Paragraph>
          While a layer is being dragged, its position is controlled by the
          draggable. When the drag ends, the position control is returned to the{' '}
          <InlineCode>Drag</InlineCode>'s value (first argument).
        </Paragraph>
        <Paragraph>
          Try dragging the example layer. What happens when you finish dragging?
        </Paragraph>
        <Paragraph>
          If you want to animate this transition, just set the{' '}
          <InlineCode>Drag</InlineCode>'s value to an{' '}
          <InlineCode>AnimatedValue</InlineCode>.
        </Paragraph>
        <DescriptionCode>
          {`Drag(Animated(160, spring()))`}
        </DescriptionCode>
      </Section>
    </div>,
  App,
  Source,
  folds: [],
};
