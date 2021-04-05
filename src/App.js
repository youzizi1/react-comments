import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      content: '',
    };
  }

  componentWillMount() {
    const username = localStorage.getItem('local-username');
    if (username) {
      this.setState({ username });
    }
  }

  componentDidMount() {
    this.contentInput.focus();
  }

  handleBlur(e) {
    localStorage.setItem('local-username', e.target.value);
  }

  handleChange(type, e) {
    this.setState({
      [type]: e.target.value,
    });
  }

  handleClick() {
    const { username, content } = this.state;
    this.props.publish(username, content);
    this.setState({
      content: '',
    });
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
            onChange={this.handleChange.bind(this, 'username')}
            onBlur={this.handleBlur.bind(this)}
          />
        </div>
        <div className="comment-input__content">
          <label htmlFor="content">评论内容：</label>
          <textarea
            id="content"
            value={content}
            onChange={this.handleChange.bind(this, 'content')}
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

class CommentList extends Component {
  static defaultProps = {
    commentList: [],
  };

  static propTypes = {
    commentList: PropTypes.array.isRequired,
    delete: PropTypes.func,
  };

  render() {
    const { commentList } = this.props;

    return (
      <div className="comment-list">
        {commentList.length ? (
          commentList.map((comment, index) => (
            <Comment
              key={index}
              index={index}
              comment={comment}
              delete={this.props.delete}
            />
          ))
        ) : (
          <div className="comment-list--no">暂无数据</div>
        )}
      </div>
    );
  }
}

class Comment extends Component {
  static defaultProps = {
    comment: {},
    index: 0,
  };

  static propTypes = {
    comment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      showDel: false,
      timeText: '',
    };

    this.timer = null;
  }

  componentWillMount() {
    clearInterval(this.timer);
    this._formatTime();
    this.timer = setInterval(() => {
      this._formatTime();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _formatTime() {
    const comment = this.props.comment;
    const duration = (Date.now() - comment.time) / 1000;
    this.setState({
      timeText:
        duration > 60
          ? `${Math.round(duration / 60)} 分钟前`
          : `${Math.round(Math.max(duration, 1))} 秒前`,
    });
  }

  handleMouseEnter(index) {
    this.setState({
      showDel: true,
      activeIndex: index,
    });
  }

  handleMouseLeave() {
    this.setState({
      showDel: false,
      activeIndex: -1,
    });
  }

  _formatContent(content) {
    return content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
  }

  handleClick(index) {
    this.props.delete(index);
  }

  render() {
    const { comment, index } = this.props;
    const { showDel, activeIndex, timeText } = this.state;
    return (
      <div
        className="list-item"
        key={index}
        onMouseEnter={this.handleMouseEnter.bind(this, index)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <div className="list-item__username">{comment.username}：</div>
        <div className="list-item__content">
          <span
            dangerouslySetInnerHTML={{
              __html: this._formatContent(comment.content),
            }}
          ></span>
          <span
            className="item__content--del"
            style={{
              display: showDel && activeIndex === index ? 'block' : 'none',
            }}
            onClick={this.handleClick.bind(this, index)}
          >
            删除
          </span>
          <span className="item__content--time">{timeText}</span>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
    };
  }

  componentWillMount() {
    const commentList = localStorage.getItem('local-commentlist');
    if (commentList) {
      this.setState({
        commentList: JSON.parse(commentList),
      });
    }
  }

  publish(username, content) {
    if (!username || !content) {
      console.log('值不能为空');
      return;
    }
    const commentList = [
      ...this.state.commentList,
      { username, content, time: Date.now() },
    ];

    this.setState({
      commentList,
    });

    localStorage.setItem('local-commentlist', JSON.stringify(commentList));
  }

  delete(index) {
    const commentList = [...this.state.commentList];
    commentList.splice(index, 1);
    this.setState({
      commentList,
    });
    localStorage.setItem('local-commentlist', JSON.stringify(commentList));
  }

  render() {
    return (
      <div className="App">
        <CommentInput publish={this.publish.bind(this)} />
        <CommentList
          commentList={this.state.commentList}
          delete={this.delete.bind(this)}
        />
      </div>
    );
  }
}

export default App;
