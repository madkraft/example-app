import React, { Component } from 'react'
import { Article } from '../../models';
import {ListArticle} from '../ListArticle';

interface Props {
  articles: Article[];
}

export class List extends Component<Props> {
  render() {
    return (
      <ul>
        {this.props.articles.map(article => (
          <li key={article.id}>
            <ListArticle {...article} />
          </li>
        ))}
      </ul>
    )
  }
}
