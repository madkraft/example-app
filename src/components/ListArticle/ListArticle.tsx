import React, { Component } from 'react';
import { IArticle } from '../../models';
import styled from 'styled-components';

const ListItem = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-weight: normal;
  margin: 0 0 -1rem;
`;

const Tag = styled.span`
  font-size: 1.2rem;
  background: #68d699;
  border-radius: 4px;
  margin: -0.1rem 0.7rem 0 0;
  padding: 0.5rem;
`;

export class ListArticle extends Component<IArticle> {
  public renderTags = () => {
    return (
      this.props.tags && this.props.tags.map(tag => <Tag key={tag}>{tag}</Tag>)
    );
  }

  public render() {
    return (
      <ListItem>
        <Title>
          <a href={this.props.url} target="_blank" rel="noopener noreferrer">
            {this.props.title}
          </a>
        </Title>
        {this.renderTags()}
      </ListItem>
    );
  }
}
