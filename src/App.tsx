import React, { Component } from 'react';
import { Router } from '@reach/router';
import { Container, Header, List } from './components';
import { SubmitPage } from './pages';

class App extends Component<{}, {}> {
  public render() {
    return (
      <div className="App">
        <Header />
        <Container>
          <Router>
            <List path="/" />
            <SubmitPage path="/submit" />
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
