import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import SignOut from './SignOut';

class HomePage extends Component {
  render(){
    return (
      <div className="home-page">
        <section>
          <h2 className='welcome-message'>Welcome {this.props.user.displayName}</h2>
          <p>Your Next Game is...</p>
          <p>You Have Won/Lost</p>
        </section>
      </div>
    );
  }
}

module.exports = HomePage
