import React from 'react';
import { Section, Paragraph, InlineCode, Header, Table } from '../../components/Description';
import Code from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'LayerTransitionChild',
  description: () => (
    <div>
      <Section>
        <Paragraph>It is common to animate items as they enter or leave. Content fades in. A screen slides from the right.</Paragraph>
        <Paragraph>Wasabi provides LayerTransitionChild to make enter and leave transitions easy. LayerTransitionChild are rendered as children of ReactTransitionGroup.</Paragraph>
        <Paragraph><InlineCode>LayerTransitionChild</InlineCode> operate just like Layer but support additional props, <InlineCode>enterProperties</InlineCode> and <InlineCode>exitProperties</InlineCode>. These properties work just like <InlineCode>properties</InlineCode> but are used during enter and leave transitions.</Paragraph>
        <Code>
{`import { LayerTransitionChild } from 'proto';
import ReactTransitionGroup from 'react-addons-transition-group';

class TransitionChild extends React.Component {
  state = {
    numLayers: 0,
  };

  render() {
    let layers = [];
    for (let i = 0; i < this.state.numLayers; i++) {
      layers.push(
        <Layer
          enterProperties={...}
          properties={...}
          exitProperties={...}
          animator={...}
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
        </Code>
      </Section>
    </div>
  ),
  App,
  Source,
};
