const Article = require('../schemaModels/article');
const _ = require('underscore');

const axios = require('axios');

/**
* 获取文章列表
* */
exports.list = function (req, res) {
    let { limit, page, keyword, category } = req.query;
    const sort = '-updateAt';

    // 查询条件
    let data = {};
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
            const json = {
                code: 200,
                data: {
                    list: article,
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
 * 上下架文章
 * */
exports.toggleOffState = function (req, res) {
    const { id, offState } = req.body;
    if (id) {
        Article.update({_id: id}, { offState }, function (err, article) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                res.json({
                    code: 200,
                    data: article,
                    message: '更新成功'
                });
            }
        });
    }
};

/**
 * 删除文章
 * */
exports.delete = function (req, res) {
    var id = req.body.id;
    if (id) {
        Article.remove({_id: id}, function (err, article) {
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
    }
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

exports.family = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    // res.status(500).json();
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                name: '刘娟娟',
                age: 18
            },
            {
                name: '张晋佩',
                age: 18
            },
            {
                name: '张岚',
                age: 3
            }
        ]
    });
};
