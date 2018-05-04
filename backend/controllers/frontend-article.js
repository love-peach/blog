const Article = require('../schemaModels/article');
const path = require('path');
const fs = require('fs');

/**
 * 获取文章列表
 * */
exports.list = function (req, res) {
    let { limit, page, keyword, category } = req.query;
    const sort = '-updateAt';

    // 查询条件
    let data = {
        offState: true
    };
    if (keyword) {
        const reg = new RegExp(keyword, 'i');
        data.title = { $regex: reg };
    }

    if (category) {
        const reg = new RegExp(category, 'i');
        data.category = { $regex: reg };
    }

    // 分页相关
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const skip = (page - 1) * limit;
    let total = 10;

    Article.count(data, function (err, count) {
        if (err) {
            console.log(err);
        }
        total = count;
    });

    Article.fetch({data, limit, sort, skip}, function (err, article) {
        if (err) {
            res.json({
                code: -200,
                message: err.toString()
            });
        } else {
            const totalPage = Math.ceil(total / limit);
            const userId = req.cookies.userId || req.headers.userId;
            const json = {
                code: 200,
                data: {
                    list: article.map(item => {
                        item.content = `${item.content.substring(0, 380)}...`;
                        item._doc.likeStatus = userId ? item.likes.includes(userId) : false;
                        return item;
                    }),
                    total,
                    totalPage,
                    hasNext: totalPage > page ? 1 : 0,
                    hasPrev: page > 1
                }
            };
            res.json(json);
        }
    });
};

/**
 * 获取单篇文章
 * */
exports.detail = function (req, res) {
    var id = req.query.id;
    Promise.all([ Article.findById(id), Article.update({_id: id}, {$inc: { viewed: 1 }}) ])
        .then(([result1, result2]) => {
            res.json({
                code: 200,
                data: result1
            });
        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            });
        });
};

/**
 * 下载
 * */
exports.download = function (req, res) {
    var id = req.query.id;
    Promise.all([ Article.findById(id), Article.update({_id: id}, {$inc: { downloadTimes: 1 }}) ])
        .then(([result1, result2]) => {
            const filePath = path.resolve(__dirname, `../../public/${result1.title}.md`);
            const markdownFile = fs.createWriteStream(filePath);
            markdownFile.write(result1.content, function (err, result) {
                console.log(err, result, 'err, result');
            });
            setTimeout(function () {
                res.download(filePath, `${result1.title}.md`);
            }, 1000);
        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            });
        });
};

/**
 * 点赞
 * */
exports.like = (req, res) => {
    const articleId = req.body.articleId;
    const userId = req.cookies.userId || req.headers.userId;
    Article.update({ _id: articleId }, { $inc: { likeCount: 1 }, $push: { likes: userId } })
        .then(result => {
            res.json({
                code: 200,
                message: '操作成功',
                data: result
            });
        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            });
        });
};

/**
 * 取消点赞
 * */
exports.unlike = (req, res) => {
    const articleId = req.body.articleId;
    const userId = req.cookies.userId || req.headers.userId;
    Article.update({ _id: articleId }, { $inc: { likeCount: -1 }, $pull: { likes: userId } })
        .then(result => {
            res.json({
                code: 200,
                message: '操作成功',
                data: result
            });
        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            });
        });
};
