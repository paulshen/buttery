import React from 'react';
import Radium from 'radium';

import Code from './Code';
import Output from './Output';
import Sections from './sections';
import Link from './components/Link';

function StatusLink({ children, to, style }, { router }) {
  return (
    <Link to={to} style={[Styles.StatusLink, style]}>
      {children}
      {router.location.pathname === to &&
        <div style={Styles.StatusLinkStrike} />}
    </Link>
  );
}
StatusLink.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
StatusLink = Radium(StatusLink);

function Nav() {
  return (
    <div style={Styles.Nav}>
      <div><StatusLink to="/section/layers">Layers</StatusLink></div>
      <div>
        <StatusLink to="/section/manipulation">Manipulation</StatusLink>
      </div>
      <div><StatusLink to="/section/animator">Animator</StatusLink></div>
      <div><StatusLink to="/section/draggable">Draggable</StatusLink></div>
      <div>
        <StatusLink to="/section/dragevents">Drag Events</StatusLink>
      </div>
      <div>
        <StatusLink to="/section/dragconstraints">Drag Constraints</StatusLink>
      </div>
      <div>
        <StatusLink to="/section/dragmomentum">
          Drag Momentum
        </StatusLink>
      </div>
      <div><StatusLink to="/section/scroll">Scroll</StatusLink></div>
      <div>
        <StatusLink to="/section/layertransitionchild">
          LayerTransitionChild
        </StatusLink>
      </div>
      <div>
        <StatusLink to="/section/viewcontrollertransition">
          View Controller Transition
        </StatusLink>
      </div>
      <div><StatusLink to="/section/uber">Uber</StatusLink></div>
    </div>
  );
}
Nav = Radium(Nav);

class SectionPage extends React.Component {
  render() {
    let { view } = this.props.route;

    let sectionName = this.props.params.sectionName || 'layers';
    let section = Sections[sectionName];
    let sectionKeys = Object.keys(Sections);
    let sectionIndex = sectionKeys.indexOf(sectionName);
    let prevSectionKey = sectionIndex > 0
      ? sectionKeys[sectionIndex - 1]
      : null;
    let nextSectionKey = sectionIndex < sectionKeys.length - 1
      ? sectionKeys[sectionIndex + 1]
      : null;

    return (
      <div style={Styles.Root}>
        <Nav />
        <div style={Styles.Body} key={sectionName}>
          <div style={[Styles.BodyColumn, Styles.TextColumn]}>
            <div style={Styles.SectionNavigator}>
              {prevSectionKey &&
                <StatusLink to={`/section/${prevSectionKey}`}>
                  &larr; {Sections[prevSectionKey].name}
                </StatusLink>}
              {nextSectionKey &&
                <StatusLink to={`/section/${nextSectionKey}`}>
                  {Sections[nextSectionKey].name} &rarr;
                </StatusLink>}
            </div>
            <div style={Styles.DescriptionBody}>
              <div style={Styles.SectionName}>{section.name}</div>
              <div style={Styles.SectionSwitcher}>
                <StatusLink
                  to={`/section/${this.props.params.sectionName}`}
                  style={Styles.SectionSwitcherLink}
                >
                  Description
                </StatusLink>
                <StatusLink
                  to={`/section/${this.props.params.sectionName}/code`}
                  style={Styles.SectionSwitcherLink}
                >
                  Code
                </StatusLink>
              </div>
              {view === 'description' &&
                <div style={Styles.Description}>
                  {section.description && section.description()}
                </div>}
            </div>
            {view === 'code' &&
              <div style={Styles.SectionCode}>
                <Code showGutter={true} foldGutter={true} folds={section.folds}>
                  {section.Source}
                </Code>
              </div>}
          </div>
          <div style={[Styles.BodyColumn, Styles.OutputColumn]}>
            <Output><section.App /></Output>
          </div>
        </div>
      </div>
    );
  }
}
export default Radium(SectionPage);

const Styles = {
  Root: {
    display: 'flex',
    height: '100vh',
  },
  Nav: {
    backgroundColor: '#f8f8f8',
    boxSizing: 'border-box',
    fontSize: '14px',
    paddingLeft: '40px',
    paddingTop: '80px',
    width: '280px',
  },
  Body: {
    boxShadow: '0 0 16px 0 rgba(0,0,0,0.02)',
    display: 'flex',
    flex: 1,
  },
  BodyColumn: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  TextColumn: {
    flex: 1,
  },
  OutputColumn: {
    maxWidth: 375 + 120,
    width: '50%',
  },
  DescriptionColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  DescriptionBody: {
    paddingLeft: '80px',
    paddingRight: '80px',
    paddingTop: '80px',
  },
  Description: {
    fontSize: '16px',
    fontWeight: 300,
    letterSpacing: '0.2px',
    lineHeight: 1.5,
    paddingBottom: '100px',
  },
  SectionNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px',
  },
  SectionName: {
    fontSize: '24px',
    letterSpacing: '1px',
  },
  SectionSwitcher: {
    marginBottom: '32px',
  },
  SectionSwitcherLink: {
    marginRight: '20px',
  },
  SectionCode: {
    flex: 1,
  },
  StatusLink: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.2,
    position: 'relative',
    textDecoration: 'none',
  },
  StatusLinkStrike: {
    backgroundColor: '#000000',
    height: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 8,
  },
};
