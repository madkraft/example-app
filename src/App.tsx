import React, { Component } from 'react';
import { Router } from '@reach/router';
import { Container, Header } from './components';
import { ListPage, SubmitPage } from './pages';

class App extends Component<{}, {}> {
  public render() {
    return (
      <div className="App">
        <Header />
        <Container>
          <Router>
            <ListPage path="/" />
            <SubmitPage path="/submit" />
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
