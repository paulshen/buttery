import React from 'react';
import { Section, Paragraph, InlineCode, Header, Table } from '../../components/Description';
import { DescriptionCode } from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Scroll',
  description: () => (
    <div>
      <Section>
        <Paragraph>Draggable layers with momentum can be used to emulate iOS scroll behavior.</Paragraph>
        <DescriptionCode>
{`class ScrollLayer extends React.Component {
  state = { y: 0 };

  render() {
    return (
      <Layer
        properties={{ ... y: this.state.y }}
        draggable={true}
        draggableProps={{
          constraintX: DragConstraint({
            min: 0, max: 0
          }),
          constraintY: DragConstraint({
            min: -1400, max: 0, bounce: true
          }),
          momentum: true,
        }}
        onDragEnd={({ y }) => this.setState({ y })}
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
