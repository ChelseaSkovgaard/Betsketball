
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import GamePage from '../lib/components/gamepage'


describe('GamePage', () => {
  let game = {
  date: "2016-10-27",
  time: "8:00PM",
  awayTeam: {
  ID: "88",
  City: "Detroit",
  Name: "Pistons",
  Abbreviation: "DET"
  },
  homeTeam: {
  ID: "91",
  City: "Atlanta",
  Name: "Hawks",
  Abbreviation: "ATL"
  },
  location: "Philips Arena"
  }
  it('can mount with no properties', () => {
    const wrapper = shallow(<GamePage />)
  })
  it('should have an the game list', function(){
    const wrapper = render(<GamePage />)
    assert.equal(wrapper.find('.games-list').length, 1)
  })
  it('should have a component of Game', ()=>{
    const wrapper = render(<GamePage game={game} />)
      assert.equal(wrapper.find('.games-list').length, 1)
  })
})
