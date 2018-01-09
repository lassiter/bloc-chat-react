import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDUiwp0RB-bKv2LtW9dcQyuhVXK6INhYs0",
  authDomain: "react-bloc-chat-745e8.firebaseapp.com",
  databaseURL: "https://react-bloc-chat-745e8.firebaseio.com",
  projectId: "react-bloc-chat-745e8",
  storageBucket: "react-bloc-chat-745e8.appspot.com",
  messagingSenderId: "772547305927"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
      this.state = { activeRoomName: "", messages: [], rooms: [] };
      this.messageRef = firebase.database().ref('messages');
      this.roomRef = firebase.database().ref('rooms');
      this.setActiveRoomName = this.setActiveRoomName.bind(this);
  }
  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message )})
      console.log(this.state)
    });
  }

  setActiveRoomName(activeRoomName){
    this.setState({ activeRoomName })
  }


  render() {
    return (
      <div className="App">
        <h1>{this.state.activeRoomName || "Select A Room"}</h1>
        <p>RoomList:</p>
        <RoomList firebase={firebase} onChangeActiveRoomName={this.setActiveRoomName}/>
        <MessageList firebase={firebase} />
      </div>
    );
  }
}

export default App;
