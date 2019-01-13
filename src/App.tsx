import React, { Component } from 'react';
import { Router } from "@reach/router";
import './App.css';
import {Container, Header} from "./components";
import { ListPage, SubmitPage } from './pages';
import { addGapiScript } from './lib/gapi';

interface State {
  isSignedIn: boolean;
}

class App extends Component<{}, State> {
  state = {
    isSignedIn: false
  }

  componentDidMount() {
    addGapiScript(this.updateSignInStatus);
  }

  updateSignInStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
      this.setState(() => ({isSignedIn}))
    }
  }

  render() {
    const {isSignedIn} = this.state;

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
