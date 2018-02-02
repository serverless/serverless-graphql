const mongoose = require('mongoose');
const validator = require('validator');

let Schema = mongoose.Schema;
let SchemaTypes = Schema.Types;

let userSchema = new Schema({
    active: Boolean,
    admin: Boolean,
    createdAt: String,
    updatedAt: String,
    language: String,
    pinResetPasscode: String,
    verified: Boolean,
    favoriteCount: Number,
    profileClicks: Number,
    basicInformation: {
        username: {
            type: String,
            unique: true,
        },
        firstname: {
            type: String,
            required: true,
            validate: {
                validator(firstname) {
                    return validator.isAlphanumeric(firstname);
                },
            },
        },
        lastname: {
            type: String,
            required: true,
            validate: {
                validator(lastname) {
                    return validator.isAlphanumeric(lastname);
                },
            },
        },
        middleInitial: String,
        gender: {
            type: String,
            required: true,
        },
        email: {
            address: {
                type: String,
                validate: {
                    validator(email) {
                        return validator.isEmail(email);
                    },
                },
                unique: true,
            },
            verified: Boolean,
        },
        address: {
            street: String,
            city: String,
            state: String,
            region: String,
            country: String,
            zip: String,
        },
        birthDate: String,
        age: Number,
        phone: {
            number: String,
            verified: Boolean,
        }
    },
    favorites: {
        models: [String],
        photographers: [String],
        brands: [String],
        muas: [String]
    },
    type: String,
    measurements: {
        height: {
            ft: Number,
            in: Number,
        },
        waist: Number,
        shoe: SchemaTypes.Mixed,
        tattoos: Boolean,
        hairColor: String,
        eyeColor: String,
    },
    photoUpload: {
        profilePicture: {
            fullResolution: String,
            displayResolution: String,
            thumbnailResolution: String
        }
    },
    tags: [String],
    rateOptions: {
        ratetype: String,
        amount: Number,
    },
    makeUpServices: [
        {
            nameOfService: String,
            price: Number,
            showPriceAfterBooking: Boolean,
            bookingFeePercentage: Number,
            flatBookingFee: Number,
            duration: Number,
            onePersonBooking: Boolean,
            noTravel: Boolean
        }
    ],
    photographerOptions: {
        camera: String,
        lens: String,
    },
    availability: {
        sunday: {
            available: Boolean,
            timeRangeStart: String,
            timeRangeEnd: String,
            allday: Boolean
        },
        monday: {
            available: Boolean,
            timeRangeStart: String,
            timeRangeEnd: String,
            allday: Boolean
        },
        tuesday: {
            available: Boolean,
            timeRangeStart: String,
            timeRangeEnd: String,
            allday: Boolean
        },
        wednesday: {
            available: Boolean,
            timeRangeStart: String,
            timeRangeEnd: String,
            allday: Boolean
        },
        thursday: {
            available: Boolean,
            timeRangeStart: String,
            timeRangeEnd: String,
            allday: Boolean
        },
        friday: {
            available: Boolean,
            timeRangeStart: String,
            timeRangeEnd: String,
            allday: Boolean
        },
        saturday: {
            available: Boolean,
            timeRangeStart: String,
            timeRangeEnd: String,
            allday: Boolean
        }
    },
    preferences: {
        emailNotification: {
            notifications: Boolean,
            newsletter: Boolean,
            contentUpdates: Boolean,
            reminders: Boolean
        }
    },
    accountServices: {
        password: {
            bcrypt: String,
        },
        paypal: String,
        sendbird: {
            user_id: String,
            nickname: String,
            profile_url: String,
            access_token: String,
            is_online: Boolean,
            last_seen_at: Number
        },
        stripe: {
            access_token: String,
            livemode: Boolean,
            refresh_token: String,
            token_type: String,
            stripe_publishable_key: String,
            stripe_user_id: String,
            scope: String
        },
        resume: {
            loginTokens: [
                {
                    when: Date,
                    hashedToken: String
                }
            ]
        }
    },
    awards: [
        {
            awardtype: String,
            Month: String,
            Year: Number
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
