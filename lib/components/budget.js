import React, { Component } from 'react';
import firebase, { reference } from '../firebase';

class Budget extends Component {
  render(){
    let userBudget = this.props.budgets[this.props.user.uid];

    return(
        <div id='deposit'>
          <input
            aria-label='budget-input'
            className='budget-field'
            type='number'
            placeholder='Enter your deposit'
            value={this.props.userBudget}
            onChange={ (event) => this.props.setBudget(event) }
            />
          <button
            disabled={!this.props.userBudget || parseInt(this.props.userBudget) < 0}
            className='submit-budget'
            onClick={ this.props.saveBudget } >
            SUBMIT
          </button>
          <span className='user-budget'>  Current Budget: ${userBudget} </span>
        </div>
    );
  }
}

module.exports = Budget;
