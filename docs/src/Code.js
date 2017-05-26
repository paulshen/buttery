import React from 'react';

import CodeMirror from 'codemirror';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';

class Code extends React.Component {
  componentDidMount() {
    this._codemirror = CodeMirror.fromTextArea(this._textarea, {
      mode: 'javascript',
      viewportMargin: Infinity,
      foldGutter: this.props.foldGutter,
      lineNumbers: true,
      gutters: ['CodeMirror-foldgutter'],
    });
    const { folds } = this.props;
    if (folds) {
      console.log(folds);
      folds.forEach(fold => this._codemirror.foldCode(CodeMirror.Pos(fold, 0)));
    }
  }

  componentWillUnmount() {
    this._codemirror.toTextArea();
  }

  render() {
    let { children } = this.props;

    return (
      <textarea
        style={Styles.Code}
        ref={c => (this._textarea = c)}
        readOnly={true}
        value={children}
      />
    );
  }
}
export default Code;

export function DescriptionCode({ children }) {
  return (
    <div style={Styles.Root}>
      <Code>{children}</Code>
    </div>
  );
}

const Styles = {
  Root: {
    marginLeft: '-80px',
    marginRight: '-80px',
    paddingBottom: '10px',
    paddingTop: '10px',
  },
  Code: {
    display: 'block',
    fontFamily: 'Inconsolata',
    fontSize: '14px',
    lineHeight: 1.3,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
};
