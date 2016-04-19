'use strict';

const handler = require('../back/api/data/handler').handler;

describe('Users', () => {
  let token;

  describe('Create', () => {
    it('should create a user', (done) => {
      let event = {
        "query": "mutation createUserTest {createUser (username: \"testuser\", name: \"Test User\", email: \"testuser@serverless.com\", password: \"secret\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let errors = combineErrors(response.errors, error);
        if (!errors) {
          try {
            let user = response.data.createUser;
            expect(user.username).to.equal('testuser');
            expect(user.name).to.equal('Test User');
            expect(user.email).to.equal('testuser@serverless.com');
            expect(user.token).to.be.null;
          } catch (exception) {
            errors = exception;
          }
        }
        done(errors);
      });
    });
  });

  describe('Read', () => {
    it('should get users', (done) => {
      let event = {
        "query": "query getUsersTest { users {id username name email token} }"
      };

      handler(event, null, (error, response) => {
        let errors = combineErrors(response.errors, error);
        if (!errors) {
          try {
            expect(response.data.users).to.have.lengthOf(1);
          } catch (exception) {
            errors = exception;
          }
        }
        done(errors);
      });
    });

    it('should get a user', (done) => {
      let event = {
        "query": "query getUserTest { user (username: \"testuser\") {id username name email token} }"
      };

      handler(event, null, (error, response) => {
        let errors = combineErrors(response.errors, error);
        if (!errors) {
          try {
            let user = response.data.user;
            expect(user.username).to.equal('testuser');
            expect(user.name).to.equal('Test User');
            expect(user.email).to.equal('testuser@serverless.com');
            expect(user.token).to.be.null;
          } catch (exception) {
            errors = exception;
          }
        }
        done(errors);
      });
    });
  });

  describe('Login', () => {
    it('should fail login user with non existing user', (done) => {
      let event = {
        "query": "mutation loginUserTest {loginUser (username: \"testusre\", password: \"secret\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let expectedError = response.errors[0];
        let errors = combineErrors(response.errors, error);
        if (!error && expectedError.message === 'User not found') {
          done(null);
        } else {
          done(errors);
        }
      });
    });

    it('should fail login user with incorrect password', (done) => {
      let event = {
        "query": "mutation loginUserTest {loginUser (username: \"testuser\", password: \"!secret\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let expectedError = response.errors[0];
        let errors = combineErrors(response.errors, error);
        if (!error && expectedError.message === 'invalid password') {
          done(null);
        } else {
          done(errors);
        }
      });
    });

    it('should login user', (done) => {
      let event = {
        "query": "mutation loginUserTest {loginUser (username: \"testuser\", password: \"secret\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let errors = combineErrors(response.errors, error);
        if (!errors) {
          try {
            let user = response.data.loginUser;
            token = user.token;
            expect(user.username).to.equal('testuser');
            expect(user.name).to.equal('Test User');
            expect(user.email).to.equal('testuser@serverless.com');
            expect(user.token).not.to.be.null;
          } catch (exception) {
            errors = exception;
          }
        }
        done(errors);
      });
    });
  });

  describe('Update', () => {
    it('should not update name and email with bad token', (done) => {
      let event = {
        "query": "mutation updateUserTest {updateUser (name: \"New Name\", email: \"newuser@serverless.com\", password: \"secret\", token: \"bad-token\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let expectedError = response.errors[0];
        let errors = combineErrors(response.errors, error);
        if (!error && expectedError.message === 'Invalid Token') {
          done(null);
        } else {
          done(errors);
        }
      });
    });

    it('should update name and email', (done) => {
      let event = {
        "query": "mutation updateUserTest {updateUser (name: \"New Name\", email: \"newuser@serverless.com\", password: \"secret\", token: \"" + token + "\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let errors = combineErrors(response.errors, error);
        if (!errors) {
          try {
            let user = response.data.updateUser;
            expect(user.name).to.equal('New Name');
            expect(user.email).to.equal('newuser@serverless.com');
          } catch (exception) {
            errors = exception;
          }
        }
        done(errors);
      });
    });
  });

  describe('Delete', () => {
    it('should fail to delete the user with bad token', (done) => {
      let event = {
        "query": "mutation deleteUserTest {deleteUser (token: \"bad-token\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let expectedError = response.errors[0];
        let errors = combineErrors(response.errors, error);
        if (!error && expectedError.message === 'Invalid Token') {
          done(null);
        } else {
          done(errors);
        }
      });
    });

    it('should delete the user', (done) => {
      let event = {
        "query": "mutation deleteUserTest {deleteUser (token: \"" + token + "\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let errors = combineErrors(response.errors, error);
        if (!errors) {
          try {
            let user = response.data.deleteUser;
            expect(user.id).to.be.null;
            expect(user.username).to.be.null;
            expect(user.name).to.be.null;
            expect(user.email).to.be.null;
            expect(user.token).to.be.null;
          } catch (exception) {
            errors = exception;
          }
        }
        done(errors);
      });
    });

    it('should get empty users response', (done) => {
      let event = {
        "query": "query getUsersTest { users {id username name email token} }"
      };

      handler(event, null, (error, response) => {
        let errors = combineErrors(response.errors, error);
        if (!errors) {
          try {
            expect(response.data.users).to.be.empty;
          } catch (exception) {
            errors = exception;
          }
        }
        done(errors);
      });
    });
  });
});
