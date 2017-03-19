import React from 'react';
import { Section, Paragraph, InlineCode, Header } from '../../components/Description';
import Code from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Draggable onDragEnd',
  description: () => (
    <div>
      <Section>
        <Paragraph>Layers support React event handlers as you expect. Props are transferred onto the underlying div.</Paragraph>
        <Paragraph>Draggable layers fire an <InlineCode>onDragEnd</InlineCode> event with the ending point. You usually want to update the <InlineCode>properties</InlineCode> on this event.</Paragraph>
        <Code>
{`class Example extends React.Component {
    state = {
      x: 0,
      y: 0,
    };

    return (
      <Layer
        properties={{
          x: this.state.x,
          y: this.state.y,
          ...
        }}
        draggable={true}
        onDragEnd={({ x, y }) => this.setState({ x, y })}
      />
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
