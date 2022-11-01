import 'react-native';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import React from 'react';
import Login from '../Src/Screen/Login'

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

configure({adapter: new Adapter()});


describe("Logintest 1", () => {
  test("TestCase1", () => {
    const component = shallow(<Login/>)
    console.log(component.debug(),"TWOO RESULT");
    expect(component).toMatchSnapshot()

 
  })
})
 
