import React from 'react';
import Radium from 'radium';

function Output({ children }) {
  return (
    <div style={Styles.Root}>
      <div style={Styles.Chrome}>
        {children}
      </div>
    </div>
  );
}
export default Radium(Output);

const Styles = {
  Root: {
    alignItems: 'center',
    backgroundColor: '#def5f0',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  Chrome: {
    backgroundColor: '#ffffff',
    height: '320px',
    width: '320px',
  },
};
