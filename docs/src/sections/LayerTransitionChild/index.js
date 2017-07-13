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
          transitions easy. <InlineCode>LayerTransitionChild</InlineCode> are
          rendered as children of
          <InlineCode>ReactTransitionGroup</InlineCode>.
        </Paragraph>
        <Paragraph>
          <InlineCode>LayerTransitionChild</InlineCode> operate just like Layer
          but support additional props, <InlineCode>enterFrame</InlineCode>,{' '}
          <InlineCode>exitFrame</InlineCode>,{' '}
          <InlineCode>enterStyle</InlineCode>,  and{' '}
          <InlineCode>exitStyle</InlineCode>.
        </Paragraph>
        <DescriptionCode>
          {`import { LayerTransitionChild } from 'proto';
import ReactTransitionGroup from 'react-addons-transition-group';

class TransitionChild extends React.Component {
  state = {
    numLayers: 0,
  };

  ...

  render() {
    let layers = [];
    for (let i = 0; i < this.state.numLayers; i++) {
      layers.push(
        <Layer
          frame={getFrame(i)}
          enterStyle={{ opacity: 0 }}
          style={{ opacity: Animated(1, timed(300)) }}
          exitStyle={{ opacity: Animated(0, timed(300)) }}
          key={i}
        />
      );
    }

    return (
      <ReactTransitionGroup>
        {layers}
      </ReactTransitionGroup>
    );
  }
}`}
        </DescriptionCode>
      </Section>
    </div>,
  App,
  Source,
};
