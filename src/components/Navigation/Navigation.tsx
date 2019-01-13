import react, { Component } from 'react';
import { Link } from '@reach/router';

export class Navigation extends Component {
  public render() {
    return (
      <>
        <Link key="latest" to="/">
          Latest |
        </Link>
        <Link key="submit" to="/submit">
          Submit
        </Link>
      </>
    );
  }
}
