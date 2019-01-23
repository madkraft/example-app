import React, { Component, ChangeEvent } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { ISubmitForm } from '../../models';
import { addNewSubmition } from '../../lib/api';

interface IState extends ISubmitForm {
  error: string;
  isSubmitted: boolean;
}

const SubmitInput = styled.input`
  padding: 1rem;
  width: 100%;
  display: block;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const SubmitButton = styled.button`
  padding: 1.5rem 2.5rem;
  font-size: 2rem;
`;

const SubmitError = styled.div`
  color: red;
`;

const SubmitSuccess = styled.div`
  color: white;
  background: green;
`;

export class SubmitPage extends Component<RouteComponentProps, IState> {
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
    const isTitle = title && title.length > 0;
    const isUrl = url && url.length > 0;

    if (isTitle && isUrl) {
      // addNewSubmition({ title, url }, this.onSubmitSuccess);
      addNewSubmition();
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
      return <SubmitSuccess>Successfully submitted!</SubmitSuccess>;
    }
  }

  public render() {
    const { error, title, url } = this.state;

    return (
      <div>
        {error && <SubmitError>{error}</SubmitError>}
        {this.renderSubmitSuccessMessage()}
        <label htmlFor="title">
          Title
          <SubmitInput
            type="text"
            value={title}
            onChange={this.handleTitleChange}
          />
        </label>
        <label htmlFor="url">
          URL
          <SubmitInput
            type="text"
            value={url}
            onChange={this.handleUrlChange}
          />
        </label>
        <SubmitButton onClick={this.handleSubmitClick}>Submit</SubmitButton>
      </div>
    );
  }
}
