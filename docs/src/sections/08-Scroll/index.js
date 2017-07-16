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
  name: 'Scroll',
  description: () =>
    <div>
      <Section>
        <Paragraph>
          Draggable layers with bounce and momentum can be used to emulate
          scroll views, paging, and other behavior.
        </Paragraph>
        <DescriptionCode>
          {`class ScrollLayer extends React.Component {
  state = { y: 0 };

  render() {
    return (
      <Layer
        frame={Frame(
          0,
          Drag(this.state.y, { min: -1000, max: 0, bounce: true, momentum: true }),
          375,
          1667,
        )}
        onDragEnd={({ y }) => this.setState({ y })}
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
