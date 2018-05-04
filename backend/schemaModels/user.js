const mongoose = require('../db');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    account: String,
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    console.log(this, 'user');
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now();
    } else {
        this.updateAt = Date.now();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            console.log(user.password);
            next();
        });
    });
});

UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
};

UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('updateAt')
            .exec(cb);
    },
    findByAccount: function (account, cb) {
        return this
            .findOne({
                account: account
            })
            .exec(cb);
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
