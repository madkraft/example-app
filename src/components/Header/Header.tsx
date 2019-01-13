import React, { Component } from 'react'
import './Header.css'
import { Navigation } from '../Navigation';

interface Props {
  isSignedIn: boolean;
}

export class Header extends Component<Props> {
  handleSignInClick = (event: any) => {
    window.gapi.auth2.getAuthInstance().signIn();
  }
  
  handleSignOutClick = (event: any) => {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  render() {
    const {isSignedIn} = this.props;

    return (
      <div className="header">
        <div>
          <span className="title">My Hacker News</span>
          <Navigation />
        </div>
        {!isSignedIn && (<div>
          <button onClick={this.handleSignInClick}>Sign in</button>
          <button onClick={this.handleSignOutClick}>Sign out</button>
        </div>)}
      </div>
    )
  }
}
