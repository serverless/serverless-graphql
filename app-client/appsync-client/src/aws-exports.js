const config = {
  AWS_ACCESS_KEY_ID: '',
  AWS_SECRET_ACCESS_KEY: '',
  HOST: 'xxxxxxx.dddpa.us-west-2.amazonaws.com', // Your hostname
  REGION: 'us-west-2', //Your region
  PATH: '/graphql',
};
config.ENDPOINT = `https://${config.HOST}${config.PATH}`;
export default config;
