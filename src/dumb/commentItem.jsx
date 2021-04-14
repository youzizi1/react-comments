import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentItem extends Component {
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

export default CommentItem