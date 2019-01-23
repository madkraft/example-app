import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
import { IRecord } from '../../models';
import { List } from '../../components';
import { fetchRecords } from '../../lib/api';

interface IState {
  articles: IRecord[];
  error: null | string;
}

export class ListPage extends Component<RouteComponentProps, IState> {
  public state = {
    articles: [],
    error: null,
  };

  public componentDidMount() {
    fetchRecords().then((records: IRecord[]) => {
      this.setState(() => ({
        articles: records,
      }));
    });
  }

  public render() {
    const { articles, error } = this.state;

    if (error) {
      return <div>Oh no! {error}</div>;
    }

    return <List articles={articles} />;
  }
}
