import react, { Component } from 'react';
import { Navigation } from '../Navigation';
import './Header.css';

interface IProps {
  isSignedIn: boolean;
}

export class Header extends Component<IProps> {
  public handleSignInClick = (event: any) => {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  public handleSignOutClick = (event: any) => {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  public render() {
    const { isSignedIn } = this.props;

    return (
      <div className="header">
        <div>
          <span className="title">My Hacker News</span>
          <Navigation />
        </div>
        {!isSignedIn && (
          <div>
            <button onClick={this.handleSignInClick}>Sign in</button>
            <button onClick={this.handleSignOutClick}>Sign out</button>
          </div>
        )}
      </div>
    );
  }
}
