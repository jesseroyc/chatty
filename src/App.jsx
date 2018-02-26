import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser: {
        name: "Anonymous",
      },
      messages: [],
      userCount: 0
    };

    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
  }


  componentDidMount() {

    this.ws = new WebSocket('ws://localhost:3001/');

    this.ws.onmessage = (event) => {
      let newMessageObj = JSON.parse(event.data);

      if (newMessageObj.type === 'clientCount') {
        this.setState({userCount: newMessageObj.count});

      } else {
        let receivedMessage = this.state.messages.concat(newMessageObj);
        this.setState({messages: receivedMessage});
      }
    }
  };

  newMessage (message) {

    let receivedMessage = {
      type: "message",
      content: message,
      username: this.state.currentUser.name,
    };
    this.ws.send(JSON.stringify(receivedMessage));
  }

  newUser(username) {

    if (this.state.currentUser.name !== username) {
        let systemNotification = {
          type: 'notification',
          content: this.state.currentUser.name + ' has changed username to ' + username
        };

        this.state.currentUser.name = username;
        this.ws.send(JSON.stringify(systemNotification));
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className='usercount'>
            {this.state.userCount} users online
          </span>
        </nav>
        <MessageList
          messages={this.state.messages} />
        <Chatbar
          onSendUser={this.newUser}
          username={this.state.currentUser.name}
          onSend={this.newMessage} />
      </div>
    )
  }
}
export default App;
