import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';

import { IRecord } from '../../models';
import { ListArticle } from '../ListArticle';
import { deleteRecord, fetchRecords, SortFields } from '../../lib/api';

interface IProps extends RouteComponentProps {
  sort?: SortFields;
}

interface IState {
  articles: IRecord[];
  error: null | string;
  loading: boolean;
}

export class List extends Component<IProps, IState> {
  public state = {
    articles: [],
    error: null,
    loading: false,
  };

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.sort !== prevProps.sort) {
      this.fetchData();
    }
  }

  public componentDidMount() {
    this.setState(() => ({
      loading: true,
    }));

    this.fetchData();
  }

  public removeArticle = (id: string) => {
    const originalArticles = this.state.articles;

    this.setState(state => ({
      articles: state.articles.filter(article => article.id !== id),
    }));

    deleteRecord(id).catch(() => {
      this.setState(() => ({
        articles: originalArticles,
        error: 'Failed to remove the article',
      }));
    });
  }

  public renderListItem = (article: IRecord) => {
    return (
      <li key={article.id}>
        <ListArticle
          {...article.fields}
          id={article.id}
          removeArticle={this.removeArticle}
        />
      </li>
    );
  }

  public render() {
    const { articles, error, loading } = this.state;

    if (error) {
      return <div>Oh no! {error}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!articles.length) {
      return <div>No available articles</div>;
    }

    return <ul>{articles.map(article => this.renderListItem(article))}</ul>;
  }

  private fetchData = () => {
    fetchRecords(this.props.sort)
      .then((records: IRecord[]) => {
        this.setState(() => ({
          articles: records,
          loading: false,
        }));
      })
      .catch(() => {
        this.setState(() => ({
          error: 'Failed to fetch data',
          loading: false,
        }));
      });
  }
}
