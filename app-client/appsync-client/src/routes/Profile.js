import React from 'react';
import PropTypes from 'prop-types';
import User from '../components/User';

const Profile = props => (
  <div className="App">
    <User handle={props.match.params.handle} />
  </div>
);

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      handle: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Profile;
