'use strict';

const gql = require ('../lib/graphql');

module.exports.handler = (event, context, cb) => {
  gql(event.query)
    .then((response) => cb(null, response))
    .catch((error) => cb(error));
}

/*

// create user
 {
 "query": "mutation createUserTest {createUser (username: \"eahefnawy\", name: \"Eslam A. Hefnawy\", email: \"eslam@serverless.com\", password: \"secret\"){id username name email token}}"
 }

 // get users
 {
 "query": "query getUsersTest { users {id username name email token} }"
 }

 // get user
 {
 "query": "query getUserTest { user (username: \"eahefnawy\") {id username name email token} }"
 }

 // login
 {
 "query": "mutation loginUserTest {loginUser (username: \"eahefnawy\", password: \"secret\"){id username name email token}}"
 }

 // update user
 {
 "query": "mutation updateUserTest {updateUser (name: \"Fake Name\", email: \"eahefnawy@gmail.com\", password: \"secret\", token: \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVhaGVmbmF3eSIsImlkIjoiYzU1YTg2NTAtZjk4Yy0xMWU1LWI0ZGQtZWJlMTMzYmNkNDJjIiwiZW1haWwiOiJlc2xhbUBzZXJ2ZXJsZXNzLmNvbSIsIm5hbWUiOiJFc2xhbSBBLiBIZWZuYXd5IiwicGVybWlzc2lvbnMiOlsiVVBEQVRFX1VTRVIiLCJERUxFVEVfVVNFUiJdLCJpYXQiOjE0NTk2ODIyNzJ9.NdS8e6FAa06qqETad4EL0A4Z816DIQbd2Ya7Z2e9zwA\"){id username name email token}}"
 }

 // delete user
 {
 "query": "mutation deleteUserTest {deleteUser (token: \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVhaGVmbmF3eSIsImlkIjoiYzU1YTg2NTAtZjk4Yy0xMWU1LWI0ZGQtZWJlMTMzYmNkNDJjIiwiZW1haWwiOiJlc2xhbUBzZXJ2ZXJsZXNzLmNvbSIsIm5hbWUiOiJFc2xhbSBBLiBIZWZuYXd5IiwicGVybWlzc2lvbnMiOlsiVVBEQVRFX1VTRVIiLCJERUxFVEVfVVNFUiJdLCJpYXQiOjE0NTk2ODIyNzJ9.NdS8e6FAa06qqETad4EL0A4Z816DIQbd2Ya7Z2e9zwA\"){id username name email token}}"
 }

*/