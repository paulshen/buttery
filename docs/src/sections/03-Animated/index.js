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
  name: 'Animator',
  description: () =>
    <div>
      <Section>
        <Paragraph>
          Frame and style properties can be animated by using an{' '}
          <InlineCode>AnimatedValue</InlineCode>. Use the{' '}
          <InlineCode>Animated</InlineCode> function, which takes a value and a
          required configuration. Whenever the scalar value of an{' '}
          <InlineCode>AnimatedValue</InlineCode> changes, the transition will be
          animated with the given configuration at the time of the value change.
        </Paragraph>
        <DescriptionCode>
          {`Animated(value: number, config: AnimatorConfig, onEnd?: Function)

<Layer
  frame={Frame(
    Animated(this.state.x, timed(300)),
    Animated(this.state.y, spring()),
    Animated(this.state.width, timed(500)),
    Animated(this.state.height, spring(180, 12))
  )}
  style={{
    borderRadius: Animated(this.state.borderRadius, spring())
  }}
/>`}
        </DescriptionCode>
      </Section>
      <Header>AnimatorConfig</Header>
      <Section>
        <Paragraph>
          There are two included types of animator configurations.
        </Paragraph>
      </Section>
      <Section>
        <Header>timed(duration)</Header>
        <Paragraph>
          If a <InlineCode>timed</InlineCode> configuration is specified, the
          value is animated linearly over the given duration.
        </Paragraph>
        <Table>
          <tr>
            <td>Prop</td>
            <td>Notes</td>
          </tr>
          <tr>
            <td>
              <InlineCode>duration</InlineCode>
            </td>
            <td>In milliseconds, required.</td>
          </tr>
        </Table>
      </Section>
      <Section>
        <Header>spring(?springK, ?frictionK)</Header>
        <Paragraph>
          If a <InlineCode>spring</InlineCode> configuration is specified, the
          value is animated using spring physics.
        </Paragraph>
        <Table>
          <tr>
            <td>Prop</td>
            <td>Notes</td>
          </tr>
          <tr>
            <td>
              <InlineCode>springK</InlineCode>
            </td>
            <td>Spring constant. Default 180</td>
          </tr>
          <tr>
            <td>
              <InlineCode>frictionK</InlineCode>
            </td>
            <td>Friction constant. Default 12</td>
          </tr>
        </Table>
      </Section>
    </div>,
  App,
  Source,
  folds: [5, 6, 7],
};
