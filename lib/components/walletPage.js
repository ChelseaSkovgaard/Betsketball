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
    debugger;
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
  }


  render(){
    let userBudget = this.props.budgets[this.props.user.uid];

    return (
      <div className="wallet-page">
        <section>
          <h2>Wallet: ${userBudget} </h2>
          <h3>Pending:</h3>
          <h3>Completed:</h3>
        </section>
      </div>
    );
  }
}

module.exports = WalletPage
