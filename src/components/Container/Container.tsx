import React, { Component } from 'react';
import './Container.css';

export class Container extends Component {
  public render() {
    return <div className="container">{this.props.children}</div>;
  }
}
