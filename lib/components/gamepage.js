import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import {pick, filter, map} from 'lodash';
import stats from '../../stats';

class GamePage extends Component {
  constructor(){
    super();
    this.state = {
      wager: '',
      todaysGames: []
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
  saveBet(user, userBudget, wager){
    reference.push({
      user:pick(user,'displayName', 'email','uid'),
      wallet :userBudget,
      wager: wager
    });
  }
  setWager(location){
    let userInput = parseInt(location.target.value);
    this.setState({wager: userInput});
  }
  render(){
    let userBudget = this.props.userBudget;
    let user = this.props.user;
    let wager = this.state.wager;
    let gamesList = (<ul className='games-list'>{this.state.todaysGames.map(g => <div><li className='game'>{g.date}</li><li>{g.awayTeam.City} FACING OFF AGAINST {g.homeTeam.City}</li><li>{g.time} @ {g.location}</li><input id="wager"
    value={this.state.wager}
    placeholder="Enter your wager!"
    onChange={(event) => this.setWager(event)}
    type="number" />
    <button
      onClick={this.saveBet(user, userBudget, wager)}>Bet!
    </button></div>)}</ul>);

    return (
      <div>
        <h2>Today's Schedule</h2>
        {gamesList}
      </div>
    );
  }
}

module.exports = GamePage
