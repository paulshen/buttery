import React from 'react';

import { Layer } from '../../proto';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Layer
          properties={{
            x: 375 / 2 - 40,
            y: 667 / 2 - 40,
            width: 80,
            height: 80,
            backgroundColor: '#1693A5',
          }}
          draggable={true}
        />
      </div>
    );
  }
}
