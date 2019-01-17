import React, { Component } from 'react';
import { Router } from '@reach/router';
import { Container, Header } from './components';
import { ListPage, SubmitPage } from './pages';
import { addGapiScript } from './lib/gapi';

interface IState {
  isSignedIn: boolean;
}

class App extends Component<{}, IState> {
  public state = {
    isSignedIn: false,
  };

  public componentDidMount() {
    addGapiScript(this.updateSignInStatus);
  }

  public updateSignInStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
      this.setState(() => ({ isSignedIn }));
    }
  }

  public render() {
    const { isSignedIn } = this.state;

    return (
      <div className="App">
        <Header isSignedIn={isSignedIn} />
        <Container>
          <Router>
            <ListPage isSignedIn={isSignedIn} path="/" />
            <SubmitPage isSignedIn={isSignedIn} path="/submit" />
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
