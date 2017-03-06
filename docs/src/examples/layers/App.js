import React from 'react';

import { Layer } from '../../proto';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Layer
          properties={{
            x: 100,
            y: 200,
            width: 120,
            height: 60,
            backgroundColor: '#1693A5',
            borderRadius: 8,
          }}
        />
      </div>
    );
  }
}
