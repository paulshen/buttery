import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import ExamplePage from './ExamplePage';

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/example/:exampleName" component={ExamplePage} />
        <Redirect from="*" to="/example/layers" />
      </Router>
    );
  }
}
