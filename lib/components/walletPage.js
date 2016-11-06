import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import {filter, map} from 'lodash';
import stats from '../../stats';

class WalletPage extends Component {
  constructor(){
    super();
    this.state = {
      completedWagers: [],
      pendingWagers: [],
      completedGames: [],
      pendingGames: []
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
    this.getGames(completedWagers, pendingWagers);
  }

  getGames(completedWagers, pendingWagers){
    let games = JSON.parse(stats)['fullgameschedule']['gameentry'];
    let completedGames = [];
    let pendingGames = [];
    for (var i = 0; i < completedWagers.length; i++){
      completedGames.push(filter(games, (game) => {
        return game.location.split(' ').join('-') + '-' + game.date === completedWagers[i].wager.key;
        })
      );
    }
    for (var i = 0; i < pendingWagers.length; i++){
      pendingGames.push(filter(games, (game) => {
        return game.location.split(' ').join('-') + '-' + game.date === pendingWagers[i].wager.key;
        })
      );
    }
    this.setState({completedGames: completedGames});
    this.setState({pendingGames: pendingGames});
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
