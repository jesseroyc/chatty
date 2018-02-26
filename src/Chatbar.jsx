import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      messageText: ''
    };

    this.onMessageTextChange = this.onMessageTextChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  onMessageTextChange(event) {
    if (event.key === 'Enter') {
    console.log("Message change event");
      if(isEmptyOrUndefined(event.target.value)) {
        alert("Invalid Message");
      } else {
        this.state.message = event.target.value;
        this.props.onSend(this.state.message);
      }
      event.target.value = '';
    }
  }

  onUsernameChange(event) {
    if (event.key === 'Enter') {
    console.log("Username change event");
      if (isEmptyOrUndefined(event.target.value)) {
        this.state.username = 'Anonymous';
      } else {
        this.state.username = event.target.value;
      }

      this.props.onSendUser(this.state.username); 
      event.target.value = '';
    }
  }


  render() {
    return (

      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyPress={this.onUsernameChange} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onMessageTextChange}
          value={this.state.usermessage}/>
      </footer>
      
    )
  }
}

function isEmptyOrUndefined (str){      
  return ((typeof str == 'undefined')   
             ||  (str == null)                
             ||  (str == false)
             ||  (str.length == 0)            
             ||  (str == "")                  
             ||  (str.replace(/\s/g,"") == "")
             ||  (!/[^\s]/.test(str))         
             ||  (/^\s*$/.test(str))           
  );
}
export default Chatbar;
