import Promise from 'bluebird';

export default function(data) {
  Object.keys(data).forEach((d) => {validate[d](data[d])});
  return Promise.resolve();
}

let validate = {
  username: (username) => {
    let re = /^[a-z0-9_-]{3,16}$/;
    if (!re.test(username)) return Promise.reject('invalid username');
  },
  password: (password) => {
    let re = /[a-zA-Z]\w{3,14}$/;
    if (!re.test(password)) return Promise.reject('invalid password');
  },
  email: (email) => {
    let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!re.test(email)) return Promise.reject('invalid email');
  },
  name: (name) => {
    return;
  },
  token: (token) => {
    return;
  }
};