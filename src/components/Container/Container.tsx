import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export class Container extends Component {
  public render() {
    return <Wrapper>{this.props.children}</Wrapper>;
  }
}
