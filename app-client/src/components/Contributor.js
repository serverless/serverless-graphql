import React from 'react';
import PropTypes from 'prop-types';

function Contributor({ user }) {
  return (
    <div>
      <div>{user.name}</div>
    </div>
  );
}

Contributor.propTypes = {
  user: PropTypes.any.isRequired, // eslint-disable-line
};

export default Contributor;
