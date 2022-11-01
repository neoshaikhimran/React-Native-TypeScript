/**
 * @format
 */

 import 'react-native';
 import Adapter from 'enzyme-adapter-react-16';
 import { shallow, configure } from 'enzyme';
 import React from 'react';
import Register from '../Src/Screen/Register'
 
 // Note: test renderer must be required after react-native.
 //import renderer from 'react-test-renderer';

 configure({adapter: new Adapter()});
 
 describe("Register Test1", () =>{
  test("test RegistercaseApp 1", () => {
    const componenttwo = shallow(<Register />)
    console.log(componenttwo.debug(),"Three REsult")
    expect(componenttwo).toMatchSnapshot()
  })
 })
 