import React, { Component } from 'react'
import { RouteComponentProps } from '@reach/router';
import { Article } from '../../models';
import { sheetsConfig } from '../../config';
import { List } from '../../components';

interface Props extends RouteComponentProps {}

interface State {
  isLoading: boolean;
  articles: Article[]
  error: null | string;
}

export function fetchValues(onFetchSuccess: (articles: Article[]) => void, onFetchError: () => void) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: sheetsConfig.spreadsheetId,
        range: "Sheet1"
      })
      .then((response: any) => {
        const [ , ...values] = response.result.values;
        const articles: Article[] = values.map((article: string[]) => {
          const [id, title, url, tagsRaw] = article;
          const tags = tagsRaw ? tagsRaw.split(',') : null;

          return {id, title, url, tags}
        })

        onFetchSuccess(articles);
      }, () => onFetchError())
  });
}

export class ListPage extends Component<Props, State> {
  state = {
    isLoading: false,
    articles: [],
    error: null
  }

  componentDidMount() {
    // make a fetch layer and move to utils
    window.gapi.load("client", this.initClient);
  }

  // move to utils
  initClient = () => {
    const {apiKey, discoveryDocs} = sheetsConfig;
    
    window.gapi.client
      .init({apiKey, discoveryDocs})
      .then(this.onClientInitSuccess, this.onClientInitFailure);
  };

  onClientInitSuccess = () => {
    this.setState(() => ({
      isLoading: true
    }))
    fetchValues(this.onLoad, this.onError)
  }

  onClientInitFailure = () => {
    this.setState(() => ({
      isLoading: false,
      error: 'Could not initialize google client'
    }))
  }

  onLoad = (articles: Article[]) => {
    this.setState(() => ({
      isLoading: false,
      articles
    }));
  };

  onError = () => {
    this.setState(() => ({
      isLoading: false,
      error: 'Could not fetch data'
    }))
  }

  render() {
    const {articles, error, isLoading} = this.state;

    if (error) {
      return <div>Oh no! {error}</div>;
    }

    return isLoading ? <div>loading...</div> : <List articles={articles} />
  }
}
