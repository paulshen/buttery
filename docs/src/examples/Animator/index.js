import React from 'react';
import { Section, Paragraph, InlineCode, Header, Table } from '../../components/Description';
import { DescriptionCode } from '../../Code';

import Source from '!!raw!./App';
import App from './App';

export default {
  name: 'Animator',
  description: () => (
    <div>
      <Section>
        <Paragraph>Animate updates to <InlineCode>LayerProperties</InlineCode> by setting the <InlineCode>animator</InlineCode> prop.</Paragraph>
        <DescriptionCode>
{`<Layer
  properties={...}
  animator={TimedAnimator({ duration: 300 })}
/>`}
        </DescriptionCode>
      </Section>
      <Header>Animators</Header>
      <Section>
        <Paragraph>There are two included animators.</Paragraph>
      </Section>
      <Section>
        <Header>TimedAnimator(props)</Header>
        <Paragraph><InlineCode>TimedAnimator</InlineCode> is a simple animator that animates changes to <InlineCode>LayerProperties</InlineCode> over a given duration.</Paragraph>
        <Table>
          <tr><td>Prop</td><td>Notes</td></tr>
          <tr><td><InlineCode>duration</InlineCode></td><td>In milliseconds, required.</td></tr>
        </Table>
      </Section>
      <Section>
        <Header>SpringAnimator(props)</Header>
        <Paragraph><InlineCode>SpringAnimator</InlineCode> is an animator that uses spring physics to animate changes to <InlineCode>LayerProperties</InlineCode></Paragraph>
        <Table>
          <tr><td>Prop</td><td>Notes</td></tr>
          <tr><td><InlineCode>spring</InlineCode></td><td>Spring constant. Default 0.0005</td></tr>
          <tr><td><InlineCode>friction</InlineCode></td><td>Friction constant. Default 0.01</td></tr>
        </Table>
      </Section>
    </div>
  ),
  App,
  Source,
  folds: [5,6,7],
};
