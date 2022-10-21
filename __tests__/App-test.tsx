/**
 * @format
 */

// import 'react-native';
// import React from 'react';
 import App from '../App';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });
import Login from '../Src/Screen/Login'
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import React from 'react';
import {render , screen} from '@testing-library/react';
import * as ReactDoM from 'react-dom'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe("when rendered with a `name` prop", () => {
  it("test1", () => {
    render(<Login/>); 
    const LinkText:HTMLElement = screen.findByText(/Email/i);
    expect(LinkText).toBe('Email');
    
  });
});


  //   it("test 1", () => {
  //   const rendered = renderer.create (<Login/>).toJSON;
  //   expect(rendered).toBeTruthy();
  // });

  it("test 2", () => {
    const wrapper = shallow (<Login/>);
    expect(wrapper.querySelectorAll('TextInput')).toHaveLength(2);
  });

  // test("find login page.", async () => {
  //   render(
      
  //           <App />
          
  //   );
  //   const loginLink: HTMLElement = screen.getByRole("link", {
  //     name: /Login/i,
  //   });