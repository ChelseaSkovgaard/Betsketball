import React, { Component } from 'react';
import firebase, { reference } from '../firebase';

class Wallet extends Component {
  render(){
    return(
      <div>
        <button className='submitButton'>submit</button>
        <section>
          <h2>In Play</h2>
        </section>
        <section>
          <h2>History</h2>
        </section>
      </div>

    )
  }
}
module.exports = Wallet;
