import React, { Component, ChangeEvent } from 'react'
import { RouteComponentProps } from '@reach/router';
import './SubmitPage.css'
import { SubmitForm } from '../../models';
import { addNewSubmition } from '../../lib/gapi';

interface Props extends RouteComponentProps {
  isSignedIn: boolean;
}

interface State extends SubmitForm {
  error: string;
  isSubmitted: boolean;
}

export class SubmitPage extends Component<Props, State> {
  state: State = {
    title: '',
    url: '',
    error: '',
    isSubmitted: false
  }

  handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      error: ''
    })
  }

  handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      url: event.target.value,
      error: ''
    })
  }

  handleSubmitClick = () => {
    const {title, url} = this.state;
    const {isSignedIn} = this.props;
    const isTitle = title && title.length > 0;
    const isUrl = url && url.length > 0;
    
    if(isTitle && isUrl && isSignedIn) {
      console.log('Submitting');
      
      addNewSubmition({title, url}, this.onSubmitSuccess);
      this.resetForm();
    } else {
      this.setState(() => ({
        error: 'Please fill in the form'
      }))
    }
  }

  onSubmitSuccess = () => {
    this.setState(() => ({
      isSubmitted: true
    }))
  }

  resetForm = () => {
    this.setState(() => ({
      title: '',
      url: '',
      error: ''
    }))
  }

  render() {
    const {error, title, url, isSubmitted} = this.state

    return (
      <div>
        {error && <div className="submit-error">{error}</div>}
        {isSubmitted && <div className="submit-success">Successfully submitted!</div>}
        <label htmlFor="title">
          Title
          <input className="submit-input" type="text" value={title} onChange={this.handleTitleChange} />
        </label>
        <label htmlFor="url">
          URL
          <input className="submit-input" type="text" value={url} onChange={this.handleUrlChange} />
        </label>
        <button className="submit-button" onClick={this.handleSubmitClick}>Submit</button>
      </div>
    )
  }
}
