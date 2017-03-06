import React from 'react';
import Radium from 'radium';

function Code() {
  return (
    <pre style={Styles.Code}>
      <code>
{`<Layer
  properties={{
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    backgroundColor: ‘#00ff99’,
  }}
/>`}
      </code>
    </pre>
  );
}
export default Radium(Code);

const Styles = {
  Code: {
    fontFamily: 'courier',
    fontSize: '14px',
  },
};
