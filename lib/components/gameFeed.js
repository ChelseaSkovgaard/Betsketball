import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import {filter, map} from 'lodash';
import stats from '../../stats';
import GameFeedGame from './gameFeedGame';

class GameFeed extends Component {
  constructor(){
    super();
    this.state = {
      wagers: [],
      completedWagers: [],
      completedGames: []
    };
  }
  componentDidMount() {
    this.setState({wagers: this.props.wagers});
    this.sortWagers();
  }

  sortWagers() {
    let completedWagers = filter(this.props.wagers, (wager) => {
      return wager.wager.updated === true
    });
    this.setState({completedWagers: completedWagers});
    this.getGames(completedWagers);
  }

  getGames(completedWagers){
    let games = JSON.parse(stats)['fullgameschedule']['gameentry'];

    let completedGames = completedWagers.map(w =>
      filter(games, (game) => {
        return w.wager.key === game.location.split(' ').join('-') + '-' + game.date
      })[0]
    )

    this.setState({completedGames: completedGames});
  }

  render(){
    let completedWagers = (
    <section className='completed-wagers'>
      { this.state.completedWagers.map(w => <article className={w.wager.won}> {w.user.displayName} {w.wager.won} ${w.wager.amount} </article>)}
    </section>)

    let completedGamesList = (
    <section className='gamefeed-games'>{this.state.completedGames.map(g =>
      <GameFeedGame
      game={g} />
    )}</section>)

    return (
      <div className="wallet-page">
        <section id='gamefeed-container'><h3> Wager Feed </h3></section>
        <section id='gamefeed-container'>
          {completedWagers} {completedGamesList}
        </section>
      </div>
    );
  }
}

module.exports = GameFeed
