import React from 'react';
import { shallow } from 'enzyme';
import User from './User';

it('render user name', () => {
  const user = {
    name: 'sid',
    location: 'SF',
    screen_name: 'sidg_sid',
    description: 'follow the universe',
    favourites_count: 200,
    followers_count: 300,
    friends_count: 100,
    posts: [
      {
        name: 'sid',
        tweet: 'this is my first tweet',
      },
    ],
  };
  const wrapper = shallow(<User user={user} />);
  expect(wrapper.html()).toContain(user.description);
});
