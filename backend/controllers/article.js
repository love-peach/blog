const Article = require('../schemaModels/article');
const _ = require('underscore');

const dataFormat = require('../utils/dataFormat');
const list = dataFormat.list;

/**
* 获取文章列表
* */
exports.list = function (req, res) {
    list(req, res, Article, '_id');
};

/**
 * 获取单篇文章
 * */
exports.detail = function (req, res) {
    var id = req.query.id;
    Article.findById(id, function (err, article) {
        if (err) {
            res.json({
                code: -200,
                message: err.toString()
            });
        } else {
            res.json({
                code: 200,
                data: article
            });
        }
    });
};

/**
 * 发布文章
 */
exports.save = (req, res) => {
    const articleObj = req.body;
    const id = articleObj._id;
    const tagArr = articleObj.tag.split(',');
    let article;
    const articleData = {
        ...articleObj,
        tagArr
    };
    if (id) {
        Article.findById(id, function (err, result) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                article = _.extend(result, articleData);
                article.save(function (err, result) {
                    if (err) {
                        res.json({
                            code: -200,
                            message: err.toString()
                        });
                    } else {
                        res.json({
                            code: 200,
                            message: '更新成功',
                            data: result
                        });
                    }
                });
            }
        });
    } else {
        article = new Article(articleData);
        article.save(function (err, result) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                res.json({
                    code: 200,
                    message: '发布成功',
                    data: result
                });
            }
        });
    }
};
