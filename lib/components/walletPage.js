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
      pendingGames: [],
      pendingTotal: 0,
      completedTotal: 0
    };
  }

  componentDidMount() {
    this.sortWagers();
  }

  calculatePendingTotal(wagers) {
    let amountArray = wagers.map(w => w.wager.amount);
    return amountArray.reduce((a,b) => a + b, 0);
  }
  calculateCompletedTotal(wagers) {
    let winningWagers = filter(wagers, (wager) =>
      {return wager.wager.won === 'won'}
    )
    let losingWagers = filter(wagers, (wager) =>
      {return wager.wager.won === 'lost'}
    )

    let winningAmounts = winningWagers.map(w => w.wager.amount);
    let losingAmounts = losingWagers.map(w => w.wager.amount);

    let total = winningAmounts.reduce((a,b) => a + b, 0) - losingAmounts.reduce((a,b) => a + b, 0);
    return total;
  }

  sortWagers() {
    let completedWagers = filter(this.props.wagers, (wager) => {
      return wager.wager.updated === true && wager.user.uid === this.props.user.uid;
    });
    let pendingWagers = filter(this.props.wagers, (wager) => {
      return wager.wager.updated !== true && wager.user.uid === this.props.user.uid;
    });

    this.setState({
      pendingWagers: pendingWagers,
      completedWagers: completedWagers,
      pendingTotal: this.calculatePendingTotal(pendingWagers),
      completedTotal: this.calculateCompletedTotal(completedWagers)
    });
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

    this.setState({completedGames: completedGames, pendingGames: pendingGames});
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
          <h2>${userBudget} in your account</h2>
          <h3>${this.state.pendingTotal} in Pending Wagers </h3>
          <section id='pending-container'> {pendingWagers} {pendingGamesList} </section>
          <h3> Betting History: ${this.state.completedTotal} </h3>
          <section id='completed-container'> {completedWagers} {completedGamesList} </section>
        </section>
      </div>
    );
  }
}

module.exports = WalletPage
