import express from 'express';
import bodyParser from 'body-parser';
import graphQLHandler from '../../graphql';

const SERVER_PORT = 4000;
const server = express();
server.use(bodyParser.json());

server.use((req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});

server.post('/graphql', (req, res) => {
  graphQLHandler(req.body.query, req.body.variables)
    .then(result => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(result, null, 2));
    })
    .catch(err => res.end(err));
});

server.listen(SERVER_PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is now running on http://localhost:${SERVER_PORT}`);
});
