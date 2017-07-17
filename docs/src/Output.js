import React from 'react';
import Radium from 'radium';

function Output({ children }) {
  return (
    <div style={Styles.Root}>
      <div style={Styles.Chrome} className="output">
        {children}
      </div>
    </div>
  );
}
export default Radium(Output);

const Styles = {
  Root: {
    display: 'flex',
    flex: 1,
    fontSize: '12px',
    justifyContent: 'center',
  },
  Chrome: {
    backgroundColor: '#def5f0',
    height: '400px',
    width: '400px',
  },
};
