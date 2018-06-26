const Tag = require('../schemaModels/tag');
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

    Tag.count(data, function (err, count) {
        if (err) {
            console.log(err);
        }
        total = count;
    });

    Tag.fetch({data, limit, sort, skip}, function (err, tag) {
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
                    list: tag,
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
 * 修改标签
 */
exports.save = (req, res) => {
    const tagObj = req.body;
    const id = tagObj.id;
    let tag;
    const tagData = {
        ...tagObj
    };
    if (id) {
        Tag.findById(id, function (err, result) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                tag = _.extend(result, tagData);
                tag.save(function (err, result) {
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
        tag = new Tag(tagData);
        tag.save(function (err, result) {
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
 * 删除标签
 * */
exports.delete = function (req, res) {
    var id = req.body.id;
    if (id) {
        Tag.remove({_id: id}, function (err, tag) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                res.json({
                    code: 200,
                    data: tag
                });
            }
        });
    }
};
