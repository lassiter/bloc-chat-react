import React from 'react';
import moment from 'moment';
class MessageList extends React.Component {
  constructor(props) {
    super(props);
      this.state = {content: ""};
      this.messageRef = this.props.firebase.database().ref('messages');
      this.createMessage = this.createMessage.bind(this);
      this.handleNewMessage = this.handleNewMessage.bind(this);
      this.canBeSubmitted = this.canBeSubmitted.bind(this)
  }
  createMessage(){

    const message = {
                        username: this.props.user,
                        content: this.state.content,
                        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                        roomID: this.props.activeRoom.key
      };
      this.messageRef.push(message);
      this.setState({
        username: "",
        content: "",
        sentAt: "",
        roomID: "",
        textbox: 0
      })
  }

  canBeSubmitted(){
    const {content} = this.state;
    return (
      content.length > 0 &&
      Object.keys(this.props.activeRoom).length > 0
    );
  }
  handleNewMessage(e) {
    this.setState({
                    content: e.target.value
                  }, () => console.log(this.state))

  }
  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.canBeSubmitted()){
        console.log(`!this.canBeSubmitted returned true`)
        return;
    }

    this.createMessage();
    console.log(`!this.canBeSubmitted returned false`)
  }

  render () {
    console.log(`Room key: ${this.props.activeRoom.key}, Room object is empty: ${Object.keys(this.props.activeRoom).length === 0}`);
    const isDisabled = !this.canBeSubmitted();
    // console.log(this.props.activeRoomMessages)
    const activeRoomMessages = this.props.activeRoomMessages.map((message, i) =>
      <li key={i} className="msg-container">
        <span className="msg-top">
          <div className="username">{message.username}</div>
          <div className="timestamp">{moment(message.sentAt).format('h:mm a')}</div>
        </span>
          <p className="msg-bottom msg">{message.content}</p>
      </li>
    );

    let newMessageForm = (
        <span className="msg-input">
        <form onSubmit={this.handleSubmit}>
          <textarea type="text" value={this.state.content} onChange={this.handleNewMessage}></textarea>
          <button disabled={isDisabled} type="submit">Submit</button>
        </form>
        </span>
      );



    return (
      <div className="msg-list">
        <ul>{activeRoomMessages || "Select Room to See Messages"}</ul>
        {newMessageForm}
      </div>
    )
  }
}

export default MessageList;
