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

export function getUsersForHomePage() {
    return new Promise((resolve, reject) => {
        UserModel
            .find({
                'type': { $nin: ['client'] }
            })
            .then((users) => {
                let res = {
                    top_models: [],
                    top_photographers: [],
                    top_muas: [],
                    new_models: [],
                    new_photographers: [],
                    new_muas: [],
                    featured_models: [],
                    featured_photographers: [],
                    featured_muas: [],
                };
                let models = [];
                let photographers = [];
                let muas = [];
                users.forEach((user, index) => {
                    if(user.type === 'models')
                        models.push(user);
                    if(user.type === 'photographers')
                        photographers.push(user);
                    if(user.type === 'mua')
                        muas.push(user);
                });

                let featured_json_data = JSON.parse(fs.readFileSync('data/jsons/featured.json'));
                let exclude_json_data = JSON.parse(fs.readFileSync('data/jsons/exclude.json'));
                let excludes = (exclude_json_data.data === undefined) ? [] : exclude_json_data.data;
                console.log(featured_json_data);

                // for models
                res.top_models = models;
                res.new_models = models;
                res.featured_models = models;

                res.top_models.sort((a, b) => {
                    return b.favoriteCount - a.favoriteCount;
                });
                res.top_models.forEach((model) => {
                    if(excludes.indexOf(""+model._id) > -1){
                        res.top_models = res.top_models.filter((obj) => {return obj._id !== model._id});
                    }
                });
                if(res.top_models.length > 10)
                    res.top_models = res.top_models.slice(0, 10);

                res.new_models.sort((a, b) => {
                    return new Date(moment(b.createdAt)) - new Date(moment(a.createdAt));
                });

                res.new_models.forEach((model) => {
                    if(excludes.indexOf(""+model._id) > -1){
                        res.new_models = res.new_models.filter((obj) => {return obj._id !== model._id});
                    }
                });

                if(res.new_models.length > 10)
                    res.new_models = res.new_models.slice(0, 10);

                res.featured_models.sort((a, b) => {
                    return new Date(moment(b.createdAt)) - new Date(moment(a.createdAt));
                });
                let featureds_models = (featured_json_data.featured_models === undefined) ? [] : featured_json_data.featured_models;
                let featureds_models_arr = [];
                res.featured_models.forEach((model) => {
                    console.log(featureds_models.indexOf(model._id));
                    console.log(model._id);
                    if(featureds_models.indexOf(""+model._id) > -1){
                        featureds_models_arr.push(model);
                    }
                });
                res.featured_models = featureds_models_arr;
                if(featureds_models_arr.length > 10)
                    res.featured_models = featureds_models_arr.slice(0, 10);
                //////////

                // for photographers
                res.top_photographers = photographers;
                res.new_photographers = photographers;
                res.featured_photographers = photographers;

                res.top_photographers.sort((a, b) => {
                    return b.favoriteCount - a.favoriteCount;
                });
                res.top_photographers.forEach((photographer) => {
                    if(excludes.indexOf(""+photographer._id) > -1){
                        res.top_photographers = res.top_photographers.filter((obj) => {return obj._id !== photographer._id});
                    }
                });
                if(res.top_photographers.length > 10)
                    res.top_photographers = res.top_photographers.slice(0, 10);

                res.new_photographers.sort((a, b) => {
                    return new Date(moment(b.createdAt)) - new Date(moment(a.createdAt));
                });

                res.new_photographers.forEach((photographer) => {
                    if(excludes.indexOf(""+photographer._id) > -1){
                        res.new_photographers = res.new_photographers.filter((obj) => {return obj._id !== photographer._id});
                    }
                });

                if(res.new_photographers.length > 10)
                    res.new_photographers = res.new_photographers.slice(0, 10);

                res.featured_photographers.sort((a, b) => {
                    return new Date(moment(b.createdAt)) - new Date(moment(a.createdAt));
                });
                let featureds_muas = (featured_json_data.featured_photographers === undefined) ? [] : featured_json_data.featured_photographers;
                let featureds_muas_arr = [];
                res.featured_photographers.forEach((photographer) => {
                    if(featureds_muas.indexOf(""+photographer._id) > -1){
                        featureds_muas_arr.push(photographer);
                    }
                });
                res.featured_photographers = featureds_muas_arr;
                if(featureds_muas_arr.length > 10)
                    res.featured_photographers = featureds_muas_arr.slice(0, 10);
                //////////

                // for mua
                res.top_muas = muas;
                res.new_muas = muas;
                res.featured_muas = muas;

                res.top_muas.sort((a, b) => {
                    return b.favoriteCount - a.favoriteCount;
                });
                res.top_muas.forEach((mua) => {
                    if(excludes.indexOf(""+mua._id) > -1){
                        res.top_muas = res.top_muas.filter((obj) => {return obj._id !== mua._id});
                    }
                });
                if(res.top_muas.length > 10)
                    res.top_muas = res.top_muas.slice(0, 10);

                res.new_muas.sort((a, b) => {
                    return new Date(moment(b.createdAt)) - new Date(moment(a.createdAt));
                });

                res.new_muas.forEach((mua) => {
                    if(excludes.indexOf(""+mua._id) > -1){
                        res.new_muas = res.new_muas.filter((obj) => {return obj._id !== mua._id});
                    }
                });

                if(res.new_muas.length > 10)
                    res.new_muas = res.new_muas.slice(0, 10);

                res.featured_muas.sort((a, b) => {
                    return new Date(moment(b.createdAt)) - new Date(moment(a.createdAt));
                });
                let featureds = (featured_json_data.featured_muas === undefined) ? [] : featured_json_data.featured_muas;
                let featureds_arr = [];
                res.featured_muas.forEach((mua) => {
                    if(featureds.indexOf(""+mua._id) > -1){
                        featureds_arr.push(mua);
                    }
                });
                res.featured_muas = featureds_arr;
                if(featureds_arr.length > 10)
                    res.featured_muas = featureds_arr.slice(0, 10);
                //////////

                // db.close();
                resolve(res);
            })
            .catch((err) => {
                // db.close();
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
