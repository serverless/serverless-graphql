import React from 'react';
import { shallow } from 'enzyme';
import Contributor from './Contributor';

it('render user name', () => {
  const user = {
    name: 'userName',
  };
  const wrapper = shallow(<Contributor user={user} />);
  expect(wrapper.text()).toBe(user.name);
});
