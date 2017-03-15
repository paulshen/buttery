import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import ExamplePage from './ExamplePage';

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/example/:exampleName" component={ExamplePage} view="description" />
        <Route path="/example/:exampleName/code" component={ExamplePage} view="code" />
        <Redirect from="*" to="/example/layers" />
      </Router>
    );
  }
}
