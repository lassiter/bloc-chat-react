import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = { rooms:[], newRoomName:'' };
      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.handleChange = this.handleChange.bind(this);
      this.createRoom = this.createRoom.bind(this);
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
      console.log(this.state.rooms)
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  createRoom() {
    const room = { name: this.state.newRoomName };
    this.roomsRef.push(room);
    this.setState({ rooms: this.state.rooms.concat(room), newRoomName: "" });
  }


  render() {
  const roomList = this.state.rooms.map((room,i) =>
      <li key={i}>{room.name}</li>
    )
    console.log(this.state.rooms)
    const roomForm =(
      <form onSubmit={
        (e) =>{
          e.preventDefault();
          e.stopPropagation();
          this.createRoom();
        }
      }>
        <input type="text" value={this.state.newRoomName} onChange={this.handleChange} placeholder="Name New Room"></input>
        <button type="submit">Create</button>
      </form>
    );
//onChange={this.setState({ newRoomName:this.value })}
    return (
      <div className="RoomList">
        <ul>{roomList}</ul>
        <span>{roomForm}</span>
      </div>
    );
  }
}

export default RoomList;
