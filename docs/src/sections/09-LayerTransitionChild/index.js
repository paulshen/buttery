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
  name: 'LayerTransitionChild',
  description: () =>
    <div>
      <Section>
        <Paragraph>
          It is common to animate items as they enter or leave. Content fades
          in. A screen slides from the right.
        </Paragraph>
        <Paragraph>
          react-prototyper provides{' '}
          <InlineCode>LayerTransitionChild</InlineCode> to make enter and leave
          transitions easy. <InlineCode>LayerTransitionChild</InlineCode> should
          be rendered as children of{' '}
          <InlineCode>ReactTransitionGroup</InlineCode>. You will have to
          install the node module{' '}
          <InlineCode>react-addons-transition-group</InlineCode>.
        </Paragraph>
        <Paragraph>
          <InlineCode>LayerTransitionChild</InlineCode> operate just like{' '}
          <InlineCode>Layer</InlineCode>
          but support additional props, <InlineCode>
            enterFrame
          </InlineCode>, <InlineCode>exitFrame</InlineCode>,{' '}
          <InlineCode>enterStyle</InlineCode>, and{' '}
          <InlineCode>exitStyle</InlineCode>. These props are merged with the
          usual <InlineCode>frame</InlineCode> and{' '}
          <InlineCode>style</InlineCode> props.
        </Paragraph>
        <DescriptionCode>
          {`import ReactTransitionGroup from 'react-addons-transition-group';

// This examples fades the layer as it is shown/hidden.
<ReactTransitionGroup>
  {shouldShowLayer &&
    <Layer
      frame={...}
      enterStyle={{ opacity: 0 }}
      style={{ opacity: Animated(1, timed(300)) }}
      exitStyle={{ opacity: Animated(0, timed(300)) }}
      key="1"
    />}
</ReactTransitionGroup>`}
        </DescriptionCode>
      </Section>
    </div>,
  App,
  Source,
};
