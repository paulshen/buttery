import React from 'react';
import Radium from 'radium';

function Code({ children }) {
  return (
    <pre>
      <code style={Styles.Code}>
        {children}
      </code>
    </pre>
  );
}
export default Radium(Code);

const Styles = {
  Code: {
    fontFamily: 'Inconsolata',
    fontSize: '16px',
    lineHeight: 1.3,
  },
};
