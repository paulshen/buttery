import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import DocumentationPage from './DocumentationPage';

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={DocumentationPage} />
      </Router>
    );
  }
}
