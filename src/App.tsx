import React, { Component } from 'react';
import { Router } from '@reach/router';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Container, Header, List } from './components';
import { SubmitPage } from './pages';

const client = new ApolloClient({
  // uri: 'https://c9ffdxfrmzjwpnc2w2ve.herokuapp.com',
  uri: 'http://localhost:4000',
});

class App extends Component<{}, {}> {
  public render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <Header />
          <Container>
            <Router>
              <List path="/" />
              <SubmitPage path="submit" />
            </Router>
          </Container>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
