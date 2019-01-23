import React, { Component } from 'react';
import { Navigation } from '../Navigation';
import styled from 'styled-components';

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

export class Header extends Component<{}> {
  public render() {
    return (
      <HeaderWrapper>
        <div>
          <Title>My Hacker News</Title>
          <Navigation />
        </div>
      </HeaderWrapper>
    );
  }
}
