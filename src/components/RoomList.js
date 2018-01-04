import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = { rooms:[] };
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( snapshot.val() ) });
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }
  render() {
    const roomList = this.state.rooms.map((room, i) =>
      <li key={i} db-key={room.key}>{room.name}</li>
    )
    return (
      <div className="RoomList">
        <ul>{roomList}</ul>
      </div>
    );
    console.log(this.state);
  }
}

export default RoomList;
