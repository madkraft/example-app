import react, { Component, ChangeEvent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { SubmitForm } from '../../models';
import { addNewSubmition } from '../../lib/gapi';
import './SubmitPage.css';

interface Props extends RouteComponentProps {
  isSignedIn: boolean;
}

interface State extends SubmitForm {
  error: string;
  isSubmitted: boolean;
}

export class SubmitPage extends Component<Props, State> {
  public state: State = {
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

  public render() {
    const { error, title, url, isSubmitted } = this.state;

    return (
      <div>
        {error && <div className="submit-error">{error}</div>}
        {isSubmitted && (
          <div className="submit-success">Successfully submitted!</div>
        )}
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
