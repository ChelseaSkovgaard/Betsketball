import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import {filter, map} from 'lodash';

class WalletPage extends Component {
  constructor(){
    super();
    this.state = {
      completedWagers: [],
      pendingWagers: []
    };
  }

  componentDidMount() {
    this.sortWagers();
  }

  sortWagers() {
    let completedWagers = filter(this.props.wagers, (wager) => {
      return wager.wager.updated === true && wager.user.uid === this.props.user.uid;
    });
    this.setState({completedWagers: completedWagers});

    let pendingWagers = filter(this.props.wagers, (wager) => {
      return wager.wager.updated !== true && wager.user.uid === this.props.user.uid;
    });
    this.setState({pendingWagers: pendingWagers});


    //find wagers with associated user id
    //set state of completedWagers
    //set state of pendingWagers
  }


  render(){
    let completedWagers = this.state.completedWagers.map ( w => {
      return (
        //Who they bet on
        //date of the game
        //amount bet on game
      )
    }

    )

    let pendingWagers = this.state.pendingWagers.map (

    )
    return (
      <div className="wallet-page">
        <section>
          <h2>Wallet:{this.props.userBudget}</h2>
          <h3>In Play</h3>
          <div>

          </div>
          <h3>History</h3>
        </section>
      </div>
    );
  }
}

module.exports = WalletPage
