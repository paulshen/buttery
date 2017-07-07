import React from 'react';
import { Section, Paragraph, InlineCode, Header } from '../../components/Description';
import { DescriptionCode } from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Drag Events',
  description: () => (
    <div>
      <Section>
        <Paragraph>Layers support React event handlers (e.g. <InlineCode>onClick</InlineCode>) as you expect. Props are transferred onto the underlying div.</Paragraph>
        <Paragraph>Draggable layers fire an <InlineCode>onDragEnd</InlineCode> event with the ending point. You usually want to update <InlineCode>properties</InlineCode> on this event.</Paragraph>
        <Paragraph>You can also subscribe to every update with <InlineCode>onMove</InlineCode>.</Paragraph>
        <DescriptionCode>
{`class Example extends React.Component {
  state = {
    x: 0,
    y: 0,
  };

  render() {
    return (
      <Layer
        properties={{
          x: this.state.x,
          y: this.state.y,
          ...
        }}
        draggable={true}
        onMove={
          ({ x, y }) => console.log(x, y)
        }
        onDragEnd={
          ({ x, y }) => this.setState({ x, y })
        }
      />
    );
  }
}`}
        </DescriptionCode>
      </Section>
    </div>
  ),
  App,
  Source,
};
