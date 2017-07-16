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
          {`Drag(value: number | AnimatedValue, config?: DragConfig)

// X draggable
<Layer
  frame={Frame(Drag(100), 100, 200, 200)}
/>

// X and Y draggable
<Layer
  frame={Frame(Drag(100), Drag(100), 200, 200)}
/>
`}
        </DescriptionCode>
      </Section>
      <Section>
        <Paragraph>
          While a layer is being dragged, its position is controlled by the
          draggable. When the drag ends, the position control is returned to the
          <InlineCode>Drag</InlineCode>'s value (first argument).
        </Paragraph>
        <Paragraph>
          Try dragging the example layer. What happens when you finish dragging?
        </Paragraph>
      </Section>
    </div>,
  App,
  Source,
  folds: [9],
};
