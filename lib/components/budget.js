import React, { Component } from 'react';
import firebase, { reference } from '../firebase';

class Budget extends Component {
  render(){
    return(
        <div>
          <input
            aria-label='budget-input'
            className='budget-field'
            type='number'
            placeholder='Enter your budget'
            value={this.props.userBudget}
            onChange={ (event) => this.props.setBudget(event) }
            />
          <button
            className='submit-budget'
            onClick={ this.props.saveBudget } >
            SUBMIT
          </button>
        </div>
    );
  }
}

module.exports = Budget;
