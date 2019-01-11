import React, { Component } from 'react'
import './Header.css'
import { Navigation } from '../Navigation';

export class Header extends Component {
  render() {
    return (
      <div className="header">
        <span className="title">My Hacker News</span>
        <Navigation />
      </div>
    )
  }
}
