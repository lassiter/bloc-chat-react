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
      this.state = { activeRoom: [], rooms:[],  messages: [], activeRoomMessages: [] };
      this.messageRef = firebase.database().ref('messages');
      this.roomsRef = firebase.database().ref('rooms');
      this.setActiveRoom = this.setActiveRoom.bind(this);
      this.compileActiveRoomMessages = this.compileActiveRoomMessages.bind(this);
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message )})
    });
  }

// compileActiveRoomMessages takes activeRoomName and does several things:
//// 1. Find the key for activeRoomName, then locates all messages with that same roomID.
//// 2. Returns the content, sentAt, and username, and key for each individual msg that matches "1.".

  compileActiveRoomMessages() {
    const activeRoomKey = this.state.activeRoom.key;
    let message = [];
    firebase.database().ref('messages').orderByChild("roomID").equalTo(activeRoomKey).on("child_added", snapshot => {
      message = message.concat(snapshot.val());
      console.log(message);
      // console.log(this.state.activeRoomMessages.concat(message));
      this.setState({
        activeRoomMessages : this.state.activeRoomMessages.concat(message)
      });
    });

  }

  setActiveRoom(activeRoom){
    this.setState({activeRoomMessages : []});
    this.setState({ activeRoom }, () => {
      this.compileActiveRoomMessages();
    });
  }



  render() {
    console.log(this.state.activeRoomMessages);
    return (
      <div className="App">
        <span>{"Welcome"}</span>
        <h1>{this.state.activeRoom.name || "Select A Room"}</h1>
        <p>RoomList:</p>
        <RoomList firebase={firebase} roomList={this.state.rooms} onChangeActiveRoom={this.setActiveRoom}/>
        <MessageList firebase={firebase} activeRoomMessages={this.state.activeRoomMessages} />
      </div>
    );
  }
}

export default App;
