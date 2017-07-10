import React from 'react';

import { Layer } from '../../proto';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Layer
          frame={{
            x: 100,
            y: 140,
            width: 120,
            height: 80,
          }}
          style={{
            backgroundColor: '#1693A5',
            borderRadius: 4,
          }}
        />
      </div>
    );
  }
}
