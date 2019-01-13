import React, { Component } from 'react';
import './ListArticle.css';
import { Article } from '../../models';

interface IProps extends Article {}

export class ListArticle extends Component<IProps> {
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
