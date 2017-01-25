const fs = require('fs');
const path = require('path');

const content = `module.exports = {
  AUTH_CLIENT_SECRET: '${process.env.AUTH_CLIENT_SECRET || ''}',
  AUTH_CLIENT_ID: '${process.env.AUTH_CLIENT_ID || ''}',
};
`;

const configPath = path.join(__dirname, '../../api/config.js');

fs.writeFile(configPath, content, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('api/config.js file was generated');
  }
});
