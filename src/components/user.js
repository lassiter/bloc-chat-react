import React from 'react';
class User extends React.Component {
  constructor(props) {
    super(props);
      this.signIn = this.signIn.bind(this);
      this.signOut = this.signOut.bind(this);
  }
  componentDidMount(user){
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setCurrentUser(user);
    });
  }
  signIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
    this.props.firebase.auth().signInWithPopup(provider).then((results) => {
      const user = results.user;
      this.props.setCurrentUser(user);
    });
  }
  signOut(){
    this.props.firebase.auth().signOut();
    this.props.setCurrentUser(null);
  }

  render () {
    return (
      <div className="user">
        <h1>{`Welcome, ${this.props.user}.`}</h1>
            <button onClick={this.signIn}>Sign In</button>
            <button onClick={this.signOut}>Sign Out</button>
      </div>
    );
  }
}

export default User;
