
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import SignOut from '../lib/components/signOut'

const sinon = require('sinon')

describe('SignOut', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<SignOut />)
  })
  it('should have a button ', function(){
    const wrapper = render(<SignOut />)
    assert.equal(wrapper.find('button').length, 1)
  })
})
