import React from 'react';
import Radium from 'radium';

import CodeMirror from 'codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';

class Code extends React.Component {
  componentDidMount() {
    this._codemirror = CodeMirror.fromTextArea(this._textarea, {
      mode: 'javascript',
      viewportMargin: Infinity,
    });
  }

  componentWillUnmount() {
    this._codemirror.toTextArea();
  }

  render() {
    let { children } = this.props;

    return (
      <textarea
        style={Styles.Code}
        ref={c => this._textarea = c}
        readOnly={true}
        value={children}
      />
    );
  }
}
export default Radium(Code);

const Styles = {
  Code: {
    display: 'block',
    fontFamily: 'Inconsolata',
    fontSize: '16px',
    lineHeight: 1.3,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
};
