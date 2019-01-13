import react, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Article } from '../../models';
import { sheetsConfig } from '../../config';
import { List } from '../../components';

interface Props extends RouteComponentProps {
  isSignedIn: boolean;
}

interface State {
  isLoading: boolean;
  articles: Article[];
  error: null | string;
}

export function fetchValues(
  onFetchSuccess: (articles: Article[]) => void,
  onFetchError: () => void,
) {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        range: 'Sheet1',
        spreadsheetId: sheetsConfig.spreadsheetId,
      })
      .then(
        (response: any) => {
          const [, ...values] = response.result.values;
          const articles: Article[] = values.map((article: string[]) => {
            const [id, title, url, tagsRaw] = article;
            const tags = tagsRaw ? tagsRaw.split(',') : null;

            return { id, title, url, tags };
          });

          onFetchSuccess(articles);
        },
        () => onFetchError(),
      );
  });
}

export class ListPage extends Component<Props, State> {
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

  public componentWillReceiveProps(nextProps: Props) {
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
