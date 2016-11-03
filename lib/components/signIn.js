import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase, { reference, signIn, signOut } from '../firebase';

class SignIn extends Component {
  render(){
    return (
    <div className="sign-in-page">
      <h1>WAGER ON GAMES</h1>
      <h2>Luck Is What Happens When Preparation Meets Opportunity</h2>
      <button className='sign-in' onClick={() => this.props.signIn()}>
        SIGN IN
      </button>
    </div>
    );
  }
}

module.exports = SignIn
