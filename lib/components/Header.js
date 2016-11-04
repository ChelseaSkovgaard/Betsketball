import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import SignOut from './SignOut';

class Header extends Component {
  render(){
    return(
      <div className="header">
        <h1>WAGER ON GAMES</h1>
        <nav>
          <button
            className='home'
            onClick ={this.props.selectHomePage}>
            Home
          </button>
          <button
            className='wallet'
            onClick ={this.props.selectWalletPage}>
            Wallet
          </button>
          <button
            className='games'
            onClick={this.props.selectGamePage}>
            Games
          </button>
        </nav>
      </div>
    )
  }
}
module.exports = Header;
