import React from 'react';

import { Layer, Rect, Drag } from '../../proto';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Layer
          frame={Rect(Drag(100), Drag(140), 80, 80)}
          properties={{
            backgroundColor: '#1693A5',
          }}
        />
      </div>
    );
  }
}
