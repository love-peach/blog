const mongoose = require('../db');

var ResourceSchema = new mongoose.Schema({
    name: String,
    rank: Number,
    child: [{
        name: String,
        url: String,
        dis: String,
        poster: String,
        rank: Number
    }],
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
});

ResourceSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now();
    } else {
        this.updateAt = Date.now();
    }
    next();
});

ResourceSchema.statics = {
    fetch: function ({data, sort, skip, limit}, cb) {
        return this
            .find(data)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

const Resource = mongoose.model('Resource', ResourceSchema);
module.exports = Resource;
