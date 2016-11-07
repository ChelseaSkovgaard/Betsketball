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
    <section className='pending-wagers'>
      { this.state.pendingWagers.map(w => <article className='pending-wager'> You have ${w.wager.amount} wagered on the {w.wager.outcome.replace('-',' ')} </article>)}
    </section>)

    let completedWagers = (
    <section className='completed-wagers'>
      { this.state.completedWagers.map(w => <article className={w.wager.won}> You {w.wager.won} ${w.wager.amount} on the {w.wager.outcome.replace('-',' ')} </article>)}
    </section>)

    let pendingGamesList = (
    <section className='pending-games'>{this.state.pendingGames.map(g =>
      <PendingGame
      game={g} />
    )}</section>)

    let completedGamesList = (
    <section className='completed-games'>{this.state.completedGames.map(g =>
      <CompletedGame
      game={g} />
    )}</section>)

    return (
      <div className="wallet-page">
        <section>
          <h2>Wallet: ${userBudget} </h2>
          <h3>Pending Wagers </h3>
          <section id='pending-container'> {pendingWagers} {pendingGamesList} </section>
          <h3>Bet History </h3>
          <section id='completed-container'> {completedWagers} {completedGamesList} </section>
        </section>
      </div>
    );
  }
}

module.exports = WalletPage
