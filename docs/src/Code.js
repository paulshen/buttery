import React from 'react';

import CodeMirror from 'codemirror';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';

class Code extends React.Component {
  props: {
    showGutter: true,
  };

  componentDidMount() {
    this._codemirror = CodeMirror.fromTextArea(this._textarea, {
      mode: 'javascript',
      viewportMargin: Infinity,
      foldGutter: this.props.foldGutter,
      lineNumbers: this.props.showGutter,
      gutters: this.props.showGutter ? ['CodeMirror-foldgutter'] : [],
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
    <div style={Styles.DescriptionCode}>
      <Code>{children}</Code>
    </div>
  );
}

const Styles = {
  DescriptionCode: {
    backgroundColor: '#fafafa',
    marginBottom: '20px',
    marginLeft: '-40px',
    marginRight: '-40px',
    marginTop: '20px',
    paddingBottom: '10px',
    paddingLeft: '10px',
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
