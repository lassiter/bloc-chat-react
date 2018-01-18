import React from 'react';
import moment from 'moment';
class MessageList extends React.Component {
  constructor(props) {
    super(props);
      this.state = {};
      this.messageRef = this.props.firebase.database().ref('messages');
      this.createMessage = this.createMessage.bind(this);
      this.handleNewMessage = this.handleNewMessage.bind(this);
  }
  componentWillReceiveProps(){
    const activeRoomSelected = this.props.activeRoom !== {} ? "false" : "true";
    console.log("componentWillReceiveProps",this.props.activeRoom,activeRoomSelected)
  }

  createMessage(){
    const message = {
                      username: this.state.username,
                      content: this.state.content,
                      sentAt: this.state.sentAt,
                      roomID: this.state.roomID
    };
    this.messageRef.push(message);
    this.setState({
      username: "",
      content: "",
      sentAt: "",
      roomID: ""
    })
  }
  handleNewMessage(e) {
    this.setState({
                    username: this.props.user,
                    content: e.target.value,
                    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                    roomID: this.props.activeRoom.key
                  })
  }

  render () {
    const activeRoomSelected;
    console.log(this.state, this.props.activeRoom, activeRoomSelected);

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
        <form onSubmit={(e) =>{e.preventDefault();e.stopPropagation();this.createMessage();}}>
          <textarea type="text" value={this.state.content} onChange={this.handleNewMessage}></textarea>
          <button disabled={activeRoomSelected} type="submit">Submit</button>
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
