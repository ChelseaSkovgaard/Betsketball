
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import SignIn from '../lib/components/signIn'

const sinon = require('sinon')

describe('SignIn', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<SignIn />)
  })
  it('should have a button ', function(){
    const wrapper = render(<SignIn />)
    assert.equal(wrapper.find('button').length, 1)
  })
  it('should sign into the app on button click', ()=>{
    let signIn = sinon.spy();
    const wrapper = mount(<SignIn signIn={signIn} />);
    wrapper.find('.sign-in').simulate('click');
    expect(signIn).to.have.property('callCount',1)
  })
})
