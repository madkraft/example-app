import React, { Component } from 'react'
import { Link } from '@reach/router';

export class Navigation extends Component {
  render() {
    return (
      <div>
        <Link to="/">Latest |</Link>
        <Link to="/submit">Submit</Link>
      </div>
    )
  }
}
