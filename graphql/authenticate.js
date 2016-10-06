/* @flow */

import jsonwebtoken from 'jsonwebtoken';
import config from '../api/config';

const AUTH_SECRET = new Buffer(config.AUTH_CLIENT_SECRET, 'base64');

module.exports = (authorizationHeader: string) => {
  try {
    const tokenParts = authorizationHeader.split(' ');
    if (tokenParts[0].toLowerCase() === 'bearer' && tokenParts[1]) {
      // Note: throws an Error if verify fails
      const decoded = jsonwebtoken.verify(
        tokenParts[1],
        AUTH_SECRET,
        { audience: config.AUTH_CLIENT_ID }
      );
      if (!decoded.email_verified) {
        return undefined;
      }
      return decoded;
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};
