import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './HomePage';
import DocumentationPage from './DocumentationPage';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/docs" component={DocumentationPage} />
        </div>
      </Router>
    );
  }
}
