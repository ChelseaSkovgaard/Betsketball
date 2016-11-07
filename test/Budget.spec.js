
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import Budget from '../lib/components/budget'


describe('Unit Test | Budget', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<Budget />)
  })
  it('should have an input element with 1 prop', function(){
    const wrapper = render(<Budget />)
    assert.equal(wrapper.find('.budget-field').length, 1)
  })
  it('should have a button with 1 prop', function(){
    const wrapper = render(<Budget />)
    assert.equal(wrapper.find('.submit-budget').length, 1)
  })
  it('should have the button text rendered onto the page', function(){
    const wrapper = render(<Budget/>)
    expect(wrapper.text()).to.contain('SUBMIT')
  })
})
