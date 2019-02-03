import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { ListArticle } from '../ListArticle';

interface IRequestedArticle {
  title: string;
  id: string;
  url: string;
  starred: boolean;
}

export const ALL_ARTICLES_QUERY = gql`
  query ALL_ARTICLES_QUERY {
    articles {
      title
      id
      url
      starred
    }
  }
`;

export const List: FunctionComponent<RouteComponentProps> = () => {
  // public componentDidUpdate(prevProps: IProps) {
  //   if (this.props.sort !== prevProps.sort) {
  //     this.fetchData();
  //   }
  // }

  // public removeArticle = (id: string) => {
  //   const originalArticles = this.state.articles;

  //   this.setState(state => ({
  //     articles: state.articles.filter(article => article.id !== id),
  //   }));

  //   deleteRecord(id).catch(() => {
  //     this.setState(() => ({
  //       articles: originalArticles,
  //       error: 'Failed to remove the article',
  //     }));
  //   });
  // }

  return (
    <Query query={ALL_ARTICLES_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Oh no! {error}</div>;
        if (!data.articles) return <div>No articles yet</div>;

        // learn how to type Query to know the shape of data
        return (
          <ul>
            {data.articles.map((payload: IRequestedArticle) => (
              <ListArticle key={payload.id} {...payload} />
            ))}
          </ul>
        );
      }}
    </Query>
  );
};
