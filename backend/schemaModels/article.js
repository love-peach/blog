const mongoose = require('../db');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String, // 标题
    author: String, // 作者
    content: String, // 原数据
    poster: String, // 海报
    tag: String, // 标签
    tagArr: Array, // 标签-数组
    category: String, // 分类
    categoryName: String, // 分类-显示
    status: String, // 状态
    statusName: String, // 状态-显示
    viewed: { // 浏览过
        type: Number,
        default: 0
    },
    likeCount: { // 喜欢
        type: Number,
        default: 0
    },
    commentCount: { // 评论数
        type: Number,
        default: 0
    },
    likes: {
        type: Array,
        default: []
    },
    downloadTimes: { // 下载次数
        type: Number,
        default: 0
    },
    offState: { // 上架状态
        type: Boolean,
        default: true
    },
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

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
