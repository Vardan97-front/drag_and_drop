import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './assets/style/style.scss';

import ToDo from './page/ToDo';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ToDo} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
