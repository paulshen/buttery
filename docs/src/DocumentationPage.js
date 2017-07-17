/* @flow */
import React from 'react';
import Radium from 'radium';

import Code from './Code';
import Output from './Output';
import Sections from './sections';

class CodePane extends React.Component {
  props: {
    sectionKey: string,
    onClose: Function,
  };

  render() {
    let section = Sections[this.props.sectionKey];

    return (
      <div style={Styles.CodePane}>
        <div style={[Styles.OutputHeader, Styles.CodeHeader]}>
          <div style={Styles.CodeHeaderTitle}>Code</div>
          <button onClick={this.props.onClose} style={Styles.CloseButton}>
            <img src="./close.svg" />
          </button>
        </div>
        <div style={Styles.CodeCode}>
          <Code showGutter={true} foldGutter={true} folds={section.folds}>
            {section.Source}
          </Code>
        </div>
      </div>
    );
  }
}
CodePane = Radium(CodePane);

class DocumentationPage extends React.Component {
  state = {
    selectedSectionKey: Object.keys(Sections)[0],
    showCode: false,
    selectOnScroll: true,
  };
  _bodyColumn: HTMLDivElement;
  _sections: { [sectionKey: string]: HTMLDivElement } = {};

  _onScroll = (e: SyntheticMouseEvent) => {
    if (!this.state.selectOnScroll) {
      return;
    }
    let scrollTop = this._bodyColumn.scrollTop;
    let topSection = Object.keys(this._sections).reduce(
      (top, sectionKey) => {
        let offsetTop = this._sections[sectionKey].offsetTop;
        if (
          top[0] === null ||
          (offsetTop <= scrollTop + 128 && offsetTop > top[1])
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

  _onCheckSelectOnScroll = () => {
    this.setState({
      selectOnScroll: !this.state.selectOnScroll,
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
              {Object.keys(Sections).map(sectionKey => {
                let section = Sections[sectionKey];
                return (
                  <div
                    style={Styles.Section}
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
              <div>
                <div style={Styles.BottomSpacer} />
              </div>
            </div>
            {this.state.showCode &&
              <CodePane
                onClose={() => this.setState({ showCode: false })}
                sectionKey={this.state.selectedSectionKey}
              />}
          </div>
          <div style={[Styles.ScrollColumn, Styles.OutputColumn]}>
            <div style={Styles.OutputHeader}>
              <div style={Styles.OutputName}>
                {selectedSection.name}
              </div>
              <div style={Styles.Checkboxes}>
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.showCode}
                    onChange={this._onClickShowCode}
                  />
                  Show code
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.selectOnScroll}
                    onChange={this._onCheckSelectOnScroll}
                  />
                  Update on scroll
                </label>
              </div>
            </div>
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
    width: '100vw',
  },
  ScrollColumn: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  LeftColumn: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    width: '50%',
  },
  LeftColumnScroll: {
    flex: 1,
    position: 'relative',
    zIndex: 0,
  },
  Section: {
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
  },
  OutputColumn: {
    flex: '0 1 400px',
  },
  OutputHeader: {
    alignItems: 'center',
    backgroundColor: '#49c6ae',
    color: '#ffffff',
    display: 'flex',
    height: '60px',
    padding: '0 24px',
  },
  CodeHeader: {
    backgroundColor: '#67cfbb',
  },
  CodeHeaderTitle: {
    flex: 1,
  },
  OutputName: {
    flex: 1,
  },
  BottomSpacer: {
    height: '100vh',
  },
  Checkboxes: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
  },
  CodePane: {
    backgroundColor: '#ffffff',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  CodeCode: {
    flex: 1,
    overflowY: 'auto',
  },
  CloseButton: {
    backgroundColor: 'transparent',
    border: 0,
    padding: 4,
  },
};
