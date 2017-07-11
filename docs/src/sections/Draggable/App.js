import React from 'react';

import { Layer, Frame, Drag } from '../../proto';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Layer
          frame={Frame(Drag(100), Drag(140), 80, 80)}
          properties={{
            backgroundColor: '#1693A5',
          }}
        />
      </div>
    );
  }
}
