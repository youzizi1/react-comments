import React, { Component } from "react";
import { connect } from "react-redux";

import CommentInput from "../dumb/CommentInput";
import { addComment } from "../store/action-creators";

class CommentInputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  componentWillMount() {
    const username = localStorage.getItem("local-username");
    if (username) {
      this.setState({ username });
    }
  }

  onUserNameInputBlur(username) {
    localStorage.setItem("local-username", username);
  }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.username) return alert("please input username");
    if (!comment.content) return alert("please input content");
    const comments = [...this.props.comments, comment];
    localStorage.setItem("local-comments", JSON.stringify(comments));
    if (this.props.onSubmit) {
      this.props.onSubmit(comment);
    }
  }

  render() {
    return (
      <CommentInput
        username={this.state.username}
        onSubmit={this.handleSubmitComment.bind(this)}
        onUserNameInputBlur={this.onUserNameInputBlur.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (comment) => {
    dispatch(addComment(comment));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer);
