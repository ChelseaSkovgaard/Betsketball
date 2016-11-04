import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import stats from '../../stats';
import {pick, filter, map} from 'lodash';
import createUUID from '../createUUID'


class Game extends Component {
  render(){
    let user = this.props.user
    return(
      <div className='game'>
      <li className='date-time'>{this.props.game.date} {this.props.game.time} </li>
      <li>
        <input
         onClick= {(event)=> this.props.saveTeam(event)}
         className='away-team' type='checkbox'/>
         <h2 className='away-team'>{this.props.game.awayTeam.City}</h2> @
         <input
         onClick= {(event)=> this.props.saveTeam(event)}
         className='home-team' type='checkbox'/>
         <h2 className='home-team'>{this.props.game.homeTeam.City}</h2>
         <span className='bet-input'><input
         className= {createUUID(this.props.game)}
         placeholder="Enter your wager!"
         onChange={(event) => this.props.setWager(event)}
         type="number" />
         <button
         onClick={()=>this.props.saveBet(user)}>Bet!
         </button>
         </span>
       </li>
      <li>{this.props.game.location}</li>
      </div>
    )
  }
}
module.exports = Game;
