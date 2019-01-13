import React, { Component } from 'react'
import { Link } from '@reach/router';

export class Navigation extends Component {
  render() {
    return [
      <Link key="latest" to="/">Latest |</Link>,
      <Link key="submit" to="/submit">Submit</Link>
    ]
  }
}
