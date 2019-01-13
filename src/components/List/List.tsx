import React, { Component } from 'react';
import { Article } from '../../models';
import { ListArticle } from '../ListArticle';

interface IProps {
  articles: Article[];
}

export class List extends Component<IProps> {
  public renderListItem = (article: Article) => {
    return (
      <li key={article.id}>
        <ListArticle {...article} />
      </li>
    );
  }

  public render() {
    return (
      <ul>
        {this.props.articles.map(article => this.renderListItem(article))}
      </ul>
    );
  }
}
