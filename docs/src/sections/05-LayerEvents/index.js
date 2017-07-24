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
  name: 'Layer Events',
  description: () =>
    <div>
      <Section>
        <Paragraph>
          Layers support React event handlers (e.g.{' '}
          <InlineCode>onClick</InlineCode>) as you might expect. Props are
          transferred to the underlying div.
        </Paragraph>
        <Paragraph>
          When a drag interaction is finished and control is returned, the layer
          will fire the callback <InlineCode>onDragEnd</InlineCode> with the
          ending point. It is common to update state in{' '}
          <InlineCode>onDragEnd</InlineCode> if you want to maintain a layer's
          dragged position.
        </Paragraph>
        <Paragraph>
          You can subscribe to every change to a layer's position with{' '}
          <InlineCode>onMove</InlineCode>. If you only want position changes
          from user interaction, use <InlineCode>onDrag</InlineCode>.
        </Paragraph>
        <DescriptionCode>
          {`class Example extends React.Component {
  state = {
    x: 160, // initial position
    y: 160,
  };

  render() {
    return (
      <Layer
        frame={Frame(Drag(this.state.x), Drag(this.state.y), 80, 80)}
        onMove={({ x, y }) => console.log(x, y)}
        onDragEnd={({ x, y }) => this.setState({ x, y })}
      />
    );
  }
}`}
        </DescriptionCode>
      </Section>
    </div>,
  App,
  Source,
};
