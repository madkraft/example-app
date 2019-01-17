import React, { Component } from 'react';
import { Navigation } from '../Navigation';
import styled from 'styled-components';

interface IProps {
  isSignedIn: boolean;
}

const HeaderWrapper = styled.div`
  background-color: #ff6600;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  margin-right: 2rem;
`;

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
      <HeaderWrapper>
        <div>
          <Title>My Hacker News</Title>
          <Navigation />
        </div>
        {this.renderSingInButtons()}
      </HeaderWrapper>
    );
  }
}
