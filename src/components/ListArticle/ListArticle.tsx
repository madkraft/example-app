import React, { Component } from 'react';
import { IArticle } from '../../models';
import styled from 'styled-components';
import { ReactComponent as ReactStar } from '../../assets/star.svg';
import { ReactComponent as ReactStarFilled } from '../../assets/star-filled.svg';
import { updateFavouriteStatus } from '../../lib/api';

interface IProps extends IArticle {
  id: string;
}

interface IState {
  starred: boolean;
}

const ListItem = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
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

const StarButton = styled.button<{ size: string; starred: boolean }>`
  padding: 0;
  width: ${props => `${props.size}rem`};
  height: ${props => `${props.size}rem`};
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
`;

export class ListArticle extends Component<IProps, IState> {
  public state = {
    starred: !!this.props.starred,
  };

  public handleStarClick = () => {
    const starred = !this.state.starred;
    this.setState(() => ({ starred }));
    updateFavouriteStatus(this.props.id, starred).catch(() => {
      this.setState(() => ({ starred: !starred }));
    });
  }

  public renderTags = () => {
    return (
      this.props.tags && this.props.tags.map(tag => <Tag key={tag}>{tag}</Tag>)
    );
  }

  public render() {
    const { starred } = this.state;

    return (
      <ListItem>
        <StarButton size="2" starred={starred} onClick={this.handleStarClick}>
          {starred ? <ReactStarFilled /> : <ReactStar />}
        </StarButton>
        <div>
          <Title>
            <a href={this.props.url} target="_blank" rel="noopener noreferrer">
              {this.props.title}
            </a>
          </Title>
          {this.renderTags()}
        </div>
      </ListItem>
    );
  }
}
