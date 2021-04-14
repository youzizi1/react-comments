import React, { Component } from 'react';
import PropTypes from 'prop-types'

class CommentInput extends Component {
  static propTypes = {
    username: PropTypes.string,
    onSubmit: PropTypes.func,
    onUserNameInputBlur: PropTypes.func
  }

  static defaultProps = {
    username: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      content: '',
    };
  }

  componentDidMount() {
    this.contentInput.focus();
  }

  handleBlur(e) {
    if (this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(e.target.value)
    }
  }

  handleUserNameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleContentChange(e) {
    this.setState({
      content: e.target.value,
    });
  }

  handleClick() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        time: Date.now()
      })
      this.setState({
        content: '',
      });
    }
  }

  render() {
    const { username, content } = this.state;

    return (
      <div className="comment-input">
        <div className="comment-input__username">
          <label htmlFor="username">用户名：</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={this.handleUserNameChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
        </div>
        <div className="comment-input__content">
          <label htmlFor="content">评论内容：</label>
          <textarea
            id="content"
            value={content}
            onChange={this.handleContentChange.bind(this)}
            ref={(input) => (this.contentInput = input)}
          ></textarea>
        </div>
        <div className="comment-input__button">
          <button onClick={this.handleClick.bind(this)}>发布</button>
        </div>
      </div>
    );
  }
}

export default CommentInput