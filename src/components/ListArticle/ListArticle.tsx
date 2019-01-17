import React, { Component } from 'react';
import { Article } from '../../models';
import styled from 'styled-components';

const ListItem = styled.a`
  font-size: 2rem;
`;

export class ListArticle extends Component<Article> {
  public render() {
    return (
      <ListItem target="_blank" rel="noopener" href={this.props.url}>
        {this.props.title}
      </ListItem>
    );
  }
}
