const mongoose = require('../db');

var CategorySchema = new mongoose.Schema({
    name: String,
    value: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
});

CategorySchema.pre('save', function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now();
    } else {
        this.updateAt = Date.now();
    }
    next();
});

CategorySchema.statics = {
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

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
