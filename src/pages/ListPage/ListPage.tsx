import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Article } from '../../models';
import { List } from '../../components';
import { fetchValues } from '../../lib/gapi';

interface IProps extends RouteComponentProps {
  isSignedIn: boolean;
}

interface IState {
  isLoading: boolean;
  articles: Article[];
  error: null | string;
}

export class ListPage extends Component<IProps, IState> {
  public state = {
    articles: [],
    error: null,
    isLoading: false,
  };

  public componentDidMount() {
    if (this.props.isSignedIn) {
      this.setState(() => ({
        isLoading: true,
      }));
      fetchValues(this.onLoad, this.onError);
    }
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.isSignedIn !== this.props.isSignedIn) {
      this.setState(() => ({
        isLoading: true,
      }));
      fetchValues(this.onLoad, this.onError);
    }
  }

  public onLoad = (articles: Article[]) => {
    this.setState(() => ({
      articles,
      isLoading: false,
    }));
  }

  public onError = () => {
    this.setState(() => ({
      error: 'Could not fetch data',
      isLoading: false,
    }));
  }

  public render() {
    const { articles, error, isLoading } = this.state;

    if (error) {
      return <div>Oh no! {error}</div>;
    }

    return isLoading ? <div>loading...</div> : <List articles={articles} />;
  }
}
