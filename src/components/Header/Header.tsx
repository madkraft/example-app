import React, { Component } from 'react';
import { Navigation } from '../Navigation';
import './Header.css';

interface IProps {
  isSignedIn: boolean;
}

export class Header extends Component<IProps> {
  public handleSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  public handleSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  public renderSingInButtons = () => {
    if (!this.props.isSignedIn) {
      return (
        <div>
          <button onClick={this.handleSignInClick}>Sign in</button>
          <button onClick={this.handleSignOutClick}>Sign out</button>
        </div>
      );
    }
  }

  public render() {
    return (
      <div className="header">
        <div>
          <span className="title">My Hacker News</span>
          <Navigation />
        </div>
        {this.renderSingInButtons()}
      </div>
    );
  }
}
