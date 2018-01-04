import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>RoomList:</p>
        <RoomList firebase={firebase} />
        <MessageList firebase={firebase} />
      </div>
    );
  }
}

export default App;
