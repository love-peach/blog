const mongoose = require('../db');

var TagSchema = new mongoose.Schema({
    name: String,
    rank: Number,
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
});

TagSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now();
    } else {
        this.updateAt = Date.now();
    }
    next();
});

TagSchema.statics = {
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

const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;
