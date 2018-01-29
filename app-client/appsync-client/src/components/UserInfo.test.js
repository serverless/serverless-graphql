import React from 'react';
import { shallow } from 'enzyme';
import { UserInfoComponent } from './UserInfo';

it('render user name', () => {
  const data = {
    getUserInfo: {
      name: 'sid',
      location: 'SF',
      handle: 'sidg_sid',
      description: 'follow the universe',
      following: [],
      topTweet: {
        tweet_id: '123',
        tweet: 'this is my first tweet',
        retweeted: true,
        retweet_count: 501,
        favorited: false,
      },
    },
    loading: false,
    error: null,
  };
  const wrapper = shallow(<UserInfoComponent data={data} />);
  expect(wrapper.html()).toContain(data.getUserInfo.description);
});
