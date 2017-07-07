import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import SectionPage from './SectionPage';

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/section/:sectionName" component={SectionPage} view="description" />
        <Route path="/section/:sectionName/code" component={SectionPage} view="code" />
        <Redirect from="*" to="/section/layers" />
      </Router>
    );
  }
}
