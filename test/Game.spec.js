
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import Game from '../lib/components/budget'


describe('Unit Test | Game', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<Game />)
  })
  it('should have a button with 1 prop', function(){
    const wrapper = render(<Game />)
    assert.equal(wrapper.find('.away-team').length, 0)
  })
  it('should have the button text rendered onto the page', function(){
    const wrapper = render(<Game/>)
    expect(wrapper.text()).to.contain('SUBMIT')
  })

})
