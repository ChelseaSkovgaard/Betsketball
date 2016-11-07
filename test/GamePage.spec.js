
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import GamePage from '../lib/components/gamepage'


describe('Unit Test | GamePage', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<GamePage />)
  })
  it('should have an the game list', function(){
    const wrapper = render(<GamePage />)
    assert.equal(wrapper.find('.games-list').length, 1)
  })
})
