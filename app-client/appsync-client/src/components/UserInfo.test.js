import React from 'react';
import { shallow } from 'enzyme';
import { UserInfo } from './UserInfo';

it('render user name', () => {
  const data = {
    getUserTwitterFeed: {
      name: 'sid',
      location: 'SF',
      handle: 'sidg_sid',
      description: 'follow the universe',
      favourites_count: 200,
      followers_count: 300,
      friends_count: 100,
      tweets: {
        items: [
          {
            tweet: 'this is my first tweet',
            tweet_id: '123',
          },
        ],
      },
    },
    loading: false,
    error: null,
  };
  const wrapper = shallow(<UserInfo data={data} />);
  expect(wrapper.html()).toContain(data.getUserTwitterFeed.description);
});
