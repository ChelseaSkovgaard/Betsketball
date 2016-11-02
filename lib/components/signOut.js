import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase, { signOut } from '../firebase';

class SignOut extends Component {
  render(){
    return (
      <button className='sign-out' onClick={() => signOut()}>
        SIGN OUT
      </button>
    );
  }
}

module.exports = SignOut
