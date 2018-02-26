import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (

        <div className="message">
          <div className="message-username">
            <span>{this.props.username}</span>
          </div>
          <div className="message-content">
            <span>{this.props.content}</span>
          </div>
        </div>
    )
  }
}
export default Message;
