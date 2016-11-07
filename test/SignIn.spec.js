
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import SignIn from '../lib/components/signIn'


describe('SignIn', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<SignIn />)
  })
  it('should have an input element with 1 prop', function(){
    const wrapper = render(<SignIn />)
    assert.equal(wrapper.find('.budget-field').length, 1)

  })
})
