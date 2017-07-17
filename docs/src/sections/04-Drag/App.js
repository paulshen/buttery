import React from 'react';

import { Layer, Frame, Drag } from '../../proto';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Layer
          frame={Frame(Drag(120), Drag(120), 80, 80)}
          style={{
            backgroundColor: '#49c6ae',
          }}
        />
      </div>
    );
  }
}
