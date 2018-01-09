import React from 'react';
import moment from 'moment';
class MessageList extends React.Component {

  render () {
    return (
      <div className="msg-container">
        <span className="msg-top">
          <div className="username">Username Here</div>
          <div className="timestamp">{moment(1515040804).format('h:mm a')}</div>
        </span>
          <p className="msg-bottom msg">blah Blah Blah</p>
      </div>
    )
  }
}

export default MessageList;
