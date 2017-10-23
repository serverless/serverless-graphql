import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <div className="tweet">
      <div>Name: {user.name} </div>
      <div>Location: {user.location} </div>
      <div>@Handle: {user.screen_name} </div>
      <div>About me: {user.description} </div>
      <div>Favourite Count: {user.favourites_count} </div>
      <div>Followers Count: {user.followers_count} </div>
      <div>Friends Count: {user.friends_count} </div>
      <div>Tweets : </div>
      <ol>{user.posts.map(name => <li> {name.tweet}</li>)}</ol>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.any.isRequired, // eslint-disable-line
};

export default User;
