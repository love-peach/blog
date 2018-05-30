const Category = require('../schemaModels/category');
const _ = require('underscore');

exports.list = function (req, res) {
    let { limit, page, keyword } = req.query;
    const sort = '-createAt';

    // 查询条件
    let data = {};
    if (keyword) {
        const reg = new RegExp(keyword, 'i');
        data.title = { $regex: reg };
    }

    // 分页相关
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const skip = (page - 1) * limit;
    let total = 10;

    Category.count(data, function (err, count) {
        if (err) {
            console.log(err);
        }
        total = count;
    });

    Category.fetch({data, limit, sort, skip}, function (err, category) {
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
                    list: category,
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
 * 修改分类
 */
exports.save = (req, res) => {
    const categoryObj = req.body;
    const id = categoryObj.id;
    let category;
    const categoryData = {
        ...categoryObj
    };
    if (id) {
        Category.findById(id, function (err, result) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                category = _.extend(result, categoryData);
                category.save(function (err, result) {
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
        category = new Category(categoryData);
        category.save(function (err, result) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                res.json({
                    code: 200,
                    message: '添加成功',
                    data: result
                });
            }
        });
    }
};

/**
 * 删除分类
 * */
exports.delete = function (req, res) {
    var id = req.body.id;
    if (id) {
        Category.remove({_id: id}, function (err, category) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                res.json({
                    code: 200,
                    data: category
                });
            }
        });
    }
};
