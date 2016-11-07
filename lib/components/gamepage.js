import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import {pick, filter, map} from 'lodash';
import stats from '../../stats';
import createUUID from '../createUUID'
import Game from './Game'

class GamePage extends Component {
  constructor(){
    super();
    this.state = {
      wager: '',
      todaysGames: [],
      outcome: '',
    };
  }
  componentDidMount(){
    this.getTodayGames();
  }
  getTodayGames(){
    let games = JSON.parse(stats)['fullgameschedule']['gameentry'];
    let todaysGames = filter(games, (game) => {
      return game.date === this.props.date
    });
    this.setState({todaysGames: todaysGames});
  }

  saveBet(user){
    if(this.state.outcome !== '' && this.state.wager !== ''){
      let wager = this.state.wager
      reference.push({
        wager: wager, user:pick(user,'displayName', 'email','uid')
      });
      this.setState({outcome:'', wager:''})
    }
  }

  setWager(location){
    let outcome = this.state.outcome
    let key = location.target.className
    let userInput = parseInt(location.target.value);
    let wager= { key:key,
                 amount:userInput,
                 finished:false,
                 updated: false,
                 outcome:outcome }
    this.setState({wager: wager});
  }

  saveTeam(event){
    let team = event.target.className
    this.setState({outcome:team})
  }

  render(){
    let userBudget = this.props.userBudget;
    let user = this.props.user;
    let gamesList = (
    <section className='games-list'>{this.state.todaysGames.map(g =>
      <Game
      saveTeam={this.saveTeam.bind(this)}
      saveBet={this.saveBet.bind(this)}
      user={user}
      game={g}
      setWager={this.setWager.bind(this)}
      message={this.state.message}
  />
    )}
    </section>);
    return (
      <div className="game-page">
        <h2 className='game-schedule-header'>Game Schedule</h2>
        {gamesList}
      </div>
    );
  }
}

module.exports = GamePage
