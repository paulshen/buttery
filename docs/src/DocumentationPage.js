/* @flow */
import React from 'react';
import Radium from 'radium';

import Code from './Code';
import Output from './Output';
import Sections from './sections';

class CodePane extends React.Component {
  props: {
    sectionKey: string,
  };

  render() {
    let section = Sections[this.props.sectionKey];

    return (
      <div style={Styles.CodePane}>
        <Code showGutter={true} foldGutter={true} folds={section.folds}>
          {section.Source}
        </Code>
      </div>
    );
  }
}

class DocumentationPage extends React.Component {
  state = {
    selectedSectionKey: Object.keys(Sections)[0],
    showCode: false,
  };
  _bodyColumn: HTMLDivElement;
  _sections: { [sectionKey: string]: HTMLDivElement } = {};

  _onScroll = (e: SyntheticMouseEvent) => {
    let scrollTop = this._bodyColumn.scrollTop;
    let topSection = Object.keys(this._sections).reduce(
      (top, sectionKey) => {
        let offsetTop = this._sections[sectionKey].offsetTop;
        if (
          top[0] === null ||
          (offsetTop <= scrollTop + 64 && offsetTop > top[1])
        ) {
          return [sectionKey, offsetTop];
        }
        return top;
      },
      [null, -Infinity]
    );
    const topSectionKey = topSection[0];
    if (
      topSectionKey !== null &&
      this.state.selectedSectionKey !== topSectionKey
    ) {
      this.setState({
        selectedSectionKey: topSectionKey,
      });
    }
  };

  _onClickShowCode = () => {
    this.setState({
      showCode: !this.state.showCode,
    });
  };

  render() {
    let selectedSection = Sections[this.state.selectedSectionKey];

    return (
      <div style={Styles.Root}>
        <div style={Styles.Body}>
          <div style={Styles.LeftColumn}>
            <div
              style={[Styles.ScrollColumn, Styles.LeftColumnScroll]}
              onScroll={this._onScroll}
              ref={c => (this._bodyColumn = c)}
            >
              <div style={Styles.LeftColumnInner}>
                {Object.keys(Sections).map(sectionKey => {
                  let section = Sections[sectionKey];
                  return (
                    <div
                      ref={c => (this._sections[sectionKey] = c)}
                      key={sectionKey}
                    >
                      <div style={Styles.SectionName}>
                        {section.name}
                      </div>
                      <div style={Styles.Description}>
                        {section.description && section.description()}
                      </div>
                    </div>
                  );
                })}
                <div style={Styles.BottomSpacer} />
              </div>
            </div>
            {this.state.showCode &&
              <CodePane sectionKey={this.state.selectedSectionKey} />}
          </div>
          <div style={[Styles.ScrollColumn, Styles.OutputColumn]}>
            <button
              onClick={this._onClickShowCode}
              style={Styles.ToggleCodeButton}
            >
              Toggle Code
            </button>
            <Output>
              <selectedSection.App />
            </Output>
          </div>
        </div>
      </div>
    );
  }
}
export default Radium(DocumentationPage);

const Styles = {
  Root: {
    display: 'flex',
    height: '100vh',
  },
  Body: {
    boxShadow: '0 0 16px 0 rgba(0,0,0,0.02)',
    display: 'flex',
    flex: 1,
  },
  ScrollColumn: {
    boxSizing: 'border-box',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflowY: 'auto',
  },
  LeftColumn: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  LeftColumnScroll: {
    position: 'relative',
    zIndex: 0,
  },
  LeftColumnInner: {
    padding: '64px',
  },
  SectionName: {
    fontSize: '24px',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  Description: {
    fontSize: '16px',
    fontWeight: 300,
    letterSpacing: '0.2px',
    lineHeight: 1.5,
    paddingBottom: '100px',
  },
  OutputColumn: {
    maxWidth: 375 + 120,
    width: '50%',
  },
  BottomSpacer: {
    height: '100vh',
  },
  ToggleCodeButton: {
    alignSelf: 'flex-start',
  },
  CodePane: {
    backgroundColor: '#ffffff',
    bottom: 0,
    left: 0,
    overflowY: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
};
