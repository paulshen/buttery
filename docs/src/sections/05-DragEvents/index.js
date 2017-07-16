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
  name: 'Drag Events',
  description: () =>
    <div>
      <Section>
        <Paragraph>
          Layers support React event handlers (e.g.{' '}
          <InlineCode>onClick</InlineCode>) as you expect. Props are transferred
          to the underlying div.
        </Paragraph>
        <Paragraph>
          When a drag interaction is finished, the layer will fire the callback{' '}
          <InlineCode>onDragEnd</InlineCode> with the ending point. You usually
          want to update the layer's frame on this event.
        </Paragraph>
        <Paragraph>
          You can also subscribe to every update with{' '}
          <InlineCode>onMove</InlineCode>.
        </Paragraph>
        <DescriptionCode>
          {`class Example extends React.Component {
  state = {
    x: 0,
    y: 0,
  };

  render() {
    return (
      <Layer
        frame={Frame(Drag(this.state.x), Drag(this.state.y), 100, 100)}
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
