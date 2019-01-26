import React, { Component } from 'react';

import { IRecord } from '../../models';
import { ListArticle } from '../ListArticle';

interface IProps {
  articles: IRecord[];
}

export class List extends Component<IProps> {
  public renderListItem = (article: IRecord) => {
    return (
      <li key={article.id}>
        <ListArticle {...article.fields} id={article.id} />
      </li>
    );
  }

  public render() {
    if (!this.props.articles) {
      return <div>No articles</div>;
    }

    return (
      <ul>
        {this.props.articles.map(article => this.renderListItem(article))}
      </ul>
    );
  }
}
