import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import CommentsList from "../dumb/commentsList";
import { deleteComment, initComments } from "../store/action-creators";

class CommentsListContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    deleteComment: PropTypes.func
  }

  componentWillMount() {
    this._loadComments()
  }

  _loadComments() {
    let comments = localStorage.getItem('local-comments')
    comments = comments ? JSON.parse(comments) : []
    this.props.initComments(comments)
  }

  handleDeleteComment(index){
    const { comments } = this.props
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index+1)
    ]
    localStorage.setItem('local-comments', JSON.stringify(newComments))
    if (this.props.deleteComment) {
      this.props.deleteComment(index)
    }
  }

  render() {
    return <CommentsList comments={this.props.comments} onDeleteComment={this.handleDeleteComment.bind(this)} />;
  }
}

const mapStateToProps = state => ({
  comments: state.comments
})

const mapDispatchToProps = dispatch => ({
  initComments: comments => dispatch(initComments(comments)),
  deleteComment: index => dispatch(deleteComment(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsListContainer);
