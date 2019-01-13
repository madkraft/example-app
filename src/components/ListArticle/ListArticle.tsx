import React, { Component } from 'react';
import './ListArticle.css';
import { Article } from '../../models';

export class ListArticle extends Component<Article> {
  public render() {
    return (
      <a
        className="list-article"
        target="_blank"
        rel="noopener"
        href={this.props.url}
      >
        {this.props.title}
      </a>
    );
  }
}
