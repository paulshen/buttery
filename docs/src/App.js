import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './HomePage';
import DocumentationPage from './DocumentationPage';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/docs" component={DocumentationPage} />
          <Route path="/" component={HomePage} />
        </div>
      </Router>
    );
  }
}
