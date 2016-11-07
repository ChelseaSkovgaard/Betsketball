import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import {filter, map} from 'lodash';
import stats from '../../stats';
import PendingGame from './pendingGame';
import CompletedGame from './completedGame';

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
    let pendingKeys = pendingWagers.map(w => w.wager.key);
    let completeKeys = completedWagers.map(w => w.wager.key);

    let pendingGames = filter(games, (game) => {
      return pendingKeys.includes(game.location.split(' ').join('-') + '-' + game.date)
    });
    let completedGames = filter(games, (game) => {
      return completeKeys.includes(game.location.split(' ').join('-') + '-' + game.date)
    });

    this.setState({completedGames: completedGames});
    this.setState({pendingGames: pendingGames});
  }

  render(){
    let userBudget = this.props.budgets[this.props.user.uid];

    let pendingWagers = (
    <ul className='pending-wagers'>
      { this.state.pendingWagers.map(w => <li className='pending-wager'> You have ${w.wager.amount} wagered on the {w.wager.outcome.replace('-',' ')} </li>)}
    </ul>)

    let completedWagers = (
    <ul className='completed-wagers'>
      { this.state.completedWagers.map(w => <li className={w.wager.won}> You have {w.wager.won} ${w.wager.amount} on the {w.wager.outcome.replace('-',' ')} </li>)}
    </ul>)

    let pendingGamesList = (
    <ul className='pending-games'>{this.state.pendingGames.map(g =>
      <PendingGame
      game={g} />
    )}</ul>)

    let completedGamesList = (
    <ul className='completed-games'>{this.state.completedGames.map(g =>
      <CompletedGame
      game={g} />
    )}</ul>)

    return (
      <div className="wallet-page">
        <section>
          <h2>Wallet: ${userBudget} </h2>
          <h3>Pending Games: </h3>
          <section id='pending-container'> {pendingWagers} {pendingGamesList} </section>
          <h3>Completed Games: </h3>
          <section id='completed-container'> {completedWagers} {completedGamesList} </section>
        </section>
      </div>
    );
  }
}

module.exports = WalletPage
