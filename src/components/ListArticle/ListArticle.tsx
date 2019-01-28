import React, { Component } from 'react';
import { IArticle } from '../../models';
import styled from 'styled-components';
import { ReactComponent as ReactStar } from '../../assets/star.svg';
import { ReactComponent as ReactStarFilled } from '../../assets/star-filled.svg';
import { ReactComponent as ReactDelete } from '../../assets/trash.svg';
import { updateFavouriteStatus } from '../../lib/api';

interface IProps extends IArticle {
  id: string;
  removeArticle: (id: string) => void;
}

interface IState {
  starred: boolean;
}

const ListItem = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .opaque {
    opacity: 0.6;
  }

  & .hidden {
    display: none;
  }

  &:hover {
    & .opaque {
      opacity: 1;
    }

    & .hidden {
      display: inline-block;
    }
  }
`;

const Content = styled.div`
  width: 100%;
`;

const Title = styled.div`
  /* font-weight: normal; */
  font-size: 2rem;
  margin: 0 0 -1rem;
`;

const Tag = styled.span`
  font-size: 1.2rem;
  background: #68d699;
  border-radius: 4px;
  margin: -0.1rem 0.7rem 0 0;
  padding: 0.5rem;
`;

const IconButton = styled.button<{ size: string }>`
  padding: 0.5rem;
  width: ${props => `${props.size}rem`};
  height: ${props => `${props.size}rem`};
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 1rem;
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

  public handleRemoveClick = () => {
    const { id, removeArticle } = this.props;

    removeArticle(id);
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
        <IconButton className="opaque" size="3" onClick={this.handleStarClick}>
          {starred ? <ReactStarFilled /> : <ReactStar />}
        </IconButton>
        <Content>
          <Title>
            <a href={this.props.url} target="_blank" rel="noopener noreferrer">
              {this.props.title}
            </a>
          </Title>
          {this.renderTags()}
        </Content>
        <div>
          <IconButton
            className="hidden"
            size="3"
            onClick={this.handleRemoveClick}
          >
            <ReactDelete />
          </IconButton>
        </div>
      </ListItem>
    );
  }
}
