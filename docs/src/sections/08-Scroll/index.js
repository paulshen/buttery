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
        <Paragraph>
          Unlike other libraries (e.g. UIKit), react-prototyper does not (yet)
          provide scroll-specific APIs. Instead, one is easily created by
          configuring drag. Remember you are constraining a layer's position and
          will usually have to consider the parent layer's dimension.
        </Paragraph>
        <DescriptionCode>
          {`class App extends React.Component {
  state = { y: 0 };

  render() {
    return (
      <Layer frame={Frame(0, 0, 400, 500)} style={{ overflow: 'hidden' }}>
        <Layer
          frame={Frame(
            0,
            Drag(this.state.y, {
              min: -500, // note this is -1000 (height) + 500 (parent height)
              max: 0,
              bounce: true,
              momentum: true
            }),
            400,
            1000,
          )}
          onDragEnd={({ y }) => this.setState({ y })}
        />
      </Layer>
    );
  }
}`}
        </DescriptionCode>
      </Section>
    </div>,
  App,
  Source,
};
