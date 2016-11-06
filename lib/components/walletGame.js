import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import stats from '../../stats';
import {pick, filter, map} from 'lodash';

class WalletGame extends Component {
  render(){
    return(
      <span className='game'>
        <li className='date-time'>{this.props.game.date} {this.props.game.time} </li>
        <h2 className='away-team'> {this.props.game.awayTeam.City} </h2> @
        <h2 className='home-team'>{this.props.game.homeTeam.City}</h2>
        <li>{this.props.game.location}</li>
      </span>
    )
  }
}

module.exports = WalletGame
