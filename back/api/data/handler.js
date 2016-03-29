'use strict';

var lib = require('../lib');

module.exports.handler = function(event, context) {
  return lib.query(event.query);
};

/*

// create user
 {
 "query": "mutation createUserTest {createUser (username: \"eahefnawy\", name: \"Eslam A. Hefnawy\", email: \"eslam@serverless.com\", password: \"secret\"){id username name email jwt}}"
 }

 // get users
 {
 "query": "query getUsersTest { users {id username name email jwt} }"
 }

 // get user
 {
 "query": "query getUserTest { user (username: \"eahefnawy\") {id username name email jwt} }"
 }

 // login
 {
 "query": "mutation loginUserTest {loginUser (username: \"eahefnawy\", password: \"secret\"){id username name email jwt}}"
 }

 // update user
 {
 "query": "mutation updateUserTest {updateUser (name: \"Fake Name\", email: \"eahefnawy@gmail.com\", password: \"secret\", jwt: \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVhaGVmbmF3eSIsImlkIjoiZDg2N2RhNzAtZjRkZS0xMWU1LTk0ZDgtNmZjZDY3ZWM2MjMwIiwiZW1haWwiOiJlYWhlZm5hd3lAZ21haWwuY29tIiwibmFtZSI6IkVzbGFtIEEuIEhlZm5hd3kiLCJpYXQiOjE0NTkxNjc0MzF9.XfA_B-ufkNHhjw3IWoQZ-hQE1kxMgs1OTfP-TMT436A\"){id username name email jwt}}"
 }

 // delete user
 {
 "query": "mutation deleteUserTest {deleteUser (jwt: \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVhaGVmbmF3eSIsImlkIjoiZDg2N2RhNzAtZjRkZS0xMWU1LTk0ZDgtNmZjZDY3ZWM2MjMwIiwiZW1haWwiOiJlYWhlZm5hd3lAZ21haWwuY29tIiwibmFtZSI6IkVzbGFtIEEuIEhlZm5hd3kiLCJpYXQiOjE0NTkxNjc0MzF9.XfA_B-ufkNHhjw3IWoQZ-hQE1kxMgs1OTfP-TMT436A\"){id username name email jwt}}"
 }

*/