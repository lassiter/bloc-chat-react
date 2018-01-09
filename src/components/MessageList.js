import React from 'react';
import moment from 'moment';
class MessageList extends React.Component {

  render () {
    // console.log(this.props.activeRoomMessages)
    const activeRoomMessages = this.props.activeRoomMessages.map((message, i) =>
      <li key={i} className="msg-container">
        <span className="msg-top">
          <div className="username">{message.username}</div>
          <div className="timestamp">{moment(message.sentAt).format('h:mm a')}</div>
        </span>
          <p className="msg-bottom msg">{message.content}</p>
      </li>
    )
    return (
      <div className="msg-list">
        <ul>{activeRoomMessages || "Select Room to See Messages"}</ul>
      </div>
    )
  }
}

export default MessageList;
