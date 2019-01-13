import React, { Component, ChangeEvent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { SubmitForm } from '../../models';
import { addNewSubmition } from '../../lib/gapi';
import './SubmitPage.css';

interface IProps extends RouteComponentProps {
  isSignedIn: boolean;
}

interface IState extends SubmitForm {
  error: string;
  isSubmitted: boolean;
}

export class SubmitPage extends Component<IProps, IState> {
  public state = {
    error: '',
    isSubmitted: false,
    title: '',
    url: '',
  };

  public handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      error: '',
      title: event.target.value,
    });
  }

  public handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      error: '',
      url: event.target.value,
    });
  }

  public handleSubmitClick = () => {
    const { title, url } = this.state;
    const { isSignedIn } = this.props;
    const isTitle = title && title.length > 0;
    const isUrl = url && url.length > 0;

    if (isTitle && isUrl && isSignedIn) {
      addNewSubmition({ title, url }, this.onSubmitSuccess);
      this.resetForm();
    } else {
      this.setState(() => ({
        error: 'Please fill in the form',
      }));
    }
  }

  public onSubmitSuccess = () => {
    this.setState(() => ({
      isSubmitted: true,
    }));
  }

  public resetForm = () => {
    this.setState(() => ({
      error: '',
      title: '',
      url: '',
    }));
  }

  public renderSubmitSuccessMessage = () => {
    if (this.state.isSubmitted) {
      return <div className="submit-success">Successfully submitted!</div>;
    }
  }

  public render() {
    const { error, title, url } = this.state;

    return (
      <div>
        {error && <div className="submit-error">{error}</div>}
        {this.renderSubmitSuccessMessage()}
        <label htmlFor="title">
          Title
          <input
            className="submit-input"
            type="text"
            value={title}
            onChange={this.handleTitleChange}
          />
        </label>
        <label htmlFor="url">
          URL
          <input
            className="submit-input"
            type="text"
            value={url}
            onChange={this.handleUrlChange}
          />
        </label>
        <button className="submit-button" onClick={this.handleSubmitClick}>
          Submit
        </button>
      </div>
    );
  }
}
