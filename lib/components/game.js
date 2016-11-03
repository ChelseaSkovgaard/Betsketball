import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import stats from '../../stats';
import {pick, filter, map} from 'lodash';
import createUUID from '../createUUID'


class Game extends Component {
  render(){
    let user = this.props.user
    return(
      <div>
      <li
      className='game'>{this.props.game.date}</li>
      <li><button
       onClick= {(event)=> this.props.saveTeam(event)}
       className='away-team' type='radio'>{this.props.game.awayTeam.City}</button> @ <button
       onClick= {(event)=> this.props.saveTeam(event)}
       className='home-team' type='radio'>{this.props.game.homeTeam.City}</button></li>
      <li
      >{this.props.game.time} {this.props.game.location}</li>
      <input className= {createUUID(this.props.game)}
      placeholder="Enter your wager!"
      onChange={(event) => this.props.setWager(event)}
      type="number" />
      <button
      onClick={()=>this.props.saveBet(user)}>Bet!
      </button>
      </div>
    )
  }
}
module.exports = Game;
