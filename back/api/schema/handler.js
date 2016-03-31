import https from 'https';
import { introspectionQuery } from 'graphql/utilities';
import Promise from 'bluebird';

let postData = JSON.stringify({
  query: introspectionQuery
});

let postOptions = {
  method: 'POST',
  port: 443,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

let getSchema = (event, context) => {

  postOptions.host = `${event.apiId}.execute-api.${process.env.SERVERLESS_REGION}.amazonaws.com`;
  postOptions.path = `/${process.env.SERVERLESS_STAGE}/data`;

  return Promise.fromCallback(function(cb){

    let body = '';

    let req = https.request(postOptions, (res) => {
      res.setEncoding('utf8');
      res.on('error', cb);
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        body = JSON.parse(body);
        cb(null, body);
      });
    });

    req.write(postData);

  });
};


export default (event, context) => {
  return getSchema(event, context);
}

