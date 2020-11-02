import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import UsersList from '../UsersList';

const users = [
  {
    'active': true,
    'email': 'dan.barrientos@gmail.com',
    'id': 1,
    'username': 'dan.barrientos'
  },
  {
    'active': true,
    'email': 'dan.barrientos@upeu.edu.pe',
    'id': 2,
    'username': 'dan.barrientos'
  }
];


test('UsersList renders properly', () => {
  const wrapper = shallow(<UsersList users={users}/>);
  const element = wrapper.find('h4');
  expect(element.length).toBe(2);
  expect(element.get(0).props.children).toBe('dan.barrientos');
});


test('UsersList renders a snapshot properly', () => {
  const tree = renderer.create(<UsersList users={users}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
