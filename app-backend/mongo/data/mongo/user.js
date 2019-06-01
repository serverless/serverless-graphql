const validator = require('validator');
const UserModel = require('../../model/User.js');
const moment = require('moment');
const fs = require('fs');

const createErrorResponse = (statusCode, message) => ({
    statusCode: statusCode || 501,
    headers: { 'Content-Type': 'text-plain' },
    body: message || 'Incorrect id'
});

export function getUsers() {

    return new Promise((resolve, reject) => {
        UserModel
            .find()
            .then((users) => {
                let userMap = [];
                users.forEach((user, index) => {
                    userMap[index] = user;
                });
                let res = {};
                res.users = userMap;
                resolve(res.users);
            })
            .catch((err) => {
                reject(err);
            });
        }
    );
}

export function getUserById(id) {
    return new Promise((resolve, reject) =>
        {
            UserModel
                .findOne({_id: id})
                .then((user) => {
                    resolve(user);
                })
                .catch((err) => {
                    reject(err);
                })
                .finally(() => {
                    // db.close();
                });
        }
    );
}

export function getUserAvailabilityById(id) {
    return new Promise((resolve, reject) =>
        {
            UserModel
                .findOne({_id: id})
                .then((user) => {
                    resolve(user.availability);
                })
                .catch((err) => {
                    reject(err);
                });
        }
    );
}


export function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        UserModel
            .findOne({ 'basicInformation.username' : username})
            .then((user) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            });
        }
    );
}

export function getUserByEmail(args) {
    return new Promise((resolve, reject) => {
        UserModel
            .findOne({ 'basicInformation.email.address' : args.email})
            .then((user) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            });
        }
    );
}
