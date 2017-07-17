import React from 'react';

import { Layer } from '../../proto';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Layer
          frame={{
            x: 120,
            y: 120,
            width: 80,
            height: 80,
          }}
          style={{
            backgroundColor: '#49c6ae',
          }}
        />
      </div>
    );
  }
}
