import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import SignOut from './SignOut';

class HomePage extends Component {
  render(){
    return (
      <div className="home-page">
        <section>
          <h2 className='welcome-message'>Hey {this.props.user.displayName}</h2>
        </section>
      </div>
    );
  }
}

module.exports = HomePage
