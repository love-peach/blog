const mongoose = require('../db');
const Schema = mongoose.Schema;
const Promise = require('bluebird');

const ArticleSchema = new Schema({
    title: String, // 标题
    author: String, // 作者
    content: String, // 原数据
    poster: String, // 海报
    tag: String, // 标签
    tagArr: Array, // 标签-数组
    category: String, // 分类
    categoryName: String, // 分类-显示
    viewed: Number, // 浏览过
    likeCount: Number, // 喜欢
    commentCount: Number, // 评论数
    status: String, // 状态
    statusName: String, // 状态-显示
    createAt: { // 创建日期
        type: Date,
        default: Date.now()
    },
    updateAt: { // 更新日期
        type: Date,
        default: Date.now()
    }
});
ArticleSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now();
    } else {
        this.updateAt = Date.now();
    }
    next();
});

ArticleSchema.statics = {
    fetch: function ({sort, skip, limit}, cb) {
        return this
            .find({})
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

const Article = mongoose.model('Article', ArticleSchema);
Promise.promisifyAll(Article);
Promise.promisifyAll(Article.prototype);

module.exports = Article;
