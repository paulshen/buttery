import React from 'react';

import { Layer, Rect } from '../../proto';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Layer
          frame={Rect(100, 140, 80, 80)}
          draggable={true}
          properties={{
            backgroundColor: '#1693A5',
          }}
        />
      </div>
    );
  }
}
