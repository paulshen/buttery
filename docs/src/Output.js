import React from 'react';
import Radium from 'radium';

import { Layer } from './proto';

function Output() {
  return (
    <div style={Styles.Root}>
      <Layer
        properties={{
          x: 0,
          y: 0,
          width: 80,
          height: 80,
          backgroundColor: 'blue',
        }}
      />
    </div>
  );
}
export default Radium(Output);

const Styles = {
  Root: {
  },
};
