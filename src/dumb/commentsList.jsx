import React, { Component } from 'react';

import CommentItem from './commentItem'

class CommentsList extends Component {
  static defaultProps = {
    comments: [],
  };

  render() {
    const { comments } = this.props;

    return (
      <div className="comment-list">
        {comments.length ? (
          comments.map((comment, index) => (
            <CommentItem
              key={index}
              index={index}
              comment={comment}
              delete={this.props.onDeleteComment}
            />
          ))
        ) : (
          <div className="comment-list--no">暂无数据</div>
        )}
      </div>
    );
  }
}

export default CommentsList