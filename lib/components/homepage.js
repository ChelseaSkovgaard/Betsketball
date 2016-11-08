import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import SignOut from './SignOut';

class HomePage extends Component {
  render(){
    return (
      <div className="home-page">
        <h2 className='welcome-message'> Welcome {this.props.user.displayName.split(' ')[0]}</h2>
      </div>
    );
  }
}

module.exports = HomePage
