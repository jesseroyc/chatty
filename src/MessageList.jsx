import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div className="messages">

        {
          this.props.messages.map(message => {
            if (message.type === 'notification') {
              return <div className ="system message"
                          key       ={message.id}>{message.content}</div>
            } else {
              return <Message
                        key         ={message.id}
                        username    ={message.username}
                        content     ={message.content} />
            }
          })
        }
      </div>
    )
  }
}
export default MessageList;