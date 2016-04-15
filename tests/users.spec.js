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
        expect(response.data.createUser).to.be.null;
        done(error);
      });
    });
  });

  describe('Read', () => {
    it('should get users', (done) => {
      let event =  {
        "query": "query getUsersTest { users {id username name email token} }"
      };
  
      handler(event, null, (error, response) => {
        expect(response.data.users).to.have.lengthOf(1);
        done(error);
      });
    });
  
    it('should get a user', (done) => {
      let event =   {
        "query": "query getUserTest { user (username: \"testuser\") {id username name email token} }"
      };
  
      handler(event, null, (error, response) => {
        let user = response.data.user;
        expect(user.username).to.equal('testuser');
        expect(user.name).to.equal('Test User');
        expect(user.email).to.equal('testuser@serverless.com');
        expect(user.token).to.be.null;
        done(error);
      });
    });
  });

  describe('Login', () => {
    it('should fail login user with non existing user', (done) => {
      let event = {
        "query": "mutation loginUserTest {loginUser (username: \"testusre\", password: \"secret\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        expect(response.errors[0].message).to.equal('User not found');
        done(null);
      });
    });

    it('should fail login user with incorrect password', (done) => {
      let event = {
        "query": "mutation loginUserTest {loginUser (username: \"testuser\", password: \"!secret\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        expect(response.errors[0].message).to.equal('invalid password');
        done(null);
      });
    });

    it('should login user', (done) => {
      let event = {
        "query": "mutation loginUserTest {loginUser (username: \"testuser\", password: \"secret\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let user = response.data.loginUser;
        token = user.token;
        expect(user.username).to.equal('testuser');
        expect(user.name).to.equal('Test User');
        expect(user.email).to.equal('testuser@serverless.com');
        expect(user.token).not.to.be.null;
        done(error);
      });
    });
  });

  describe('Update', () => {
    it('should not update name and email with bad token', (done) => {
      let event = {
        "query": "mutation updateUserTest {updateUser (name: \"User New Name\", email: \"newtestuser@serverless.com\", password: \"secret\", token: \"bad-token\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        expect(response.errors[0].message).to.equal('Invalid Token');
        done(error);
      });
    });

    it('should update name and email', (done) => {
      let event = {
        "query": "mutation updateUserTest {updateUser (name: \"User New Name\", email: \"newtestuser@serverless.com\", password: \"secret\", token: \""+token+"\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let user = response.data.updateUser;
        expect(user.name).to.equal('User New Name');
        expect(user.email).to.equal('newtestuser@serverless.com');
        done(error);
      });
    });
  });

  describe('Delete', () => {
    it('should fail to delete the user with bad token', (done) => {
      let event =  {
        "query": "mutation deleteUserTest {deleteUser (token: \"bad-token\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        expect(response.errors[0].message).to.equal('Invalid Token');
        done(error);
      });
    });

    it('should delete the user', (done) => {
      let event =  {
        "query": "mutation deleteUserTest {deleteUser (token: \""+token+"\"){id username name email token}}"
      };

      handler(event, null, (error, response) => {
        let user = response.data.deleteUser;
        expect(user.id).to.be.null;
        expect(user.username).to.be.null;
        expect(user.name).to.be.null;
        expect(user.email).to.be.null;
        expect(user.token).to.be.null;
        done(error);
      });
    });

    it('should get empty users response', (done) => {
      let event =  {
        "query": "query getUsersTest { users {id username name email token} }"
      };

      handler(event, null, (error, response) => {``
        expect(response.data.users).to.be.empty;
        done(error);
      });
    });
  });
});
