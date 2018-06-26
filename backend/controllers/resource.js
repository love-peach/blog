const Resource = require('../schemaModels/resource');
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

    Resource.count(data, function (err, count) {
        if (err) {
            console.log(err);
        }
        total = count;
    });

    Resource.fetch({data, limit, sort, skip}, function (err, resource) {
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
                    list: resource,
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
    const resourceObj = req.body;
    const id = resourceObj.id;
    let resource;
    const resourceData = {
        ...resourceObj
    };
    if (id) {
        Resource.findById(id, function (err, result) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                resource = _.extend(result, resourceData);
                resource.save(function (err, result) {
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
        resource = new Resource(resourceData);
        resource.save(function (err, result) {
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
 * 修改 子分类
 */
exports.saveItem = (req, res) => {
    const { resourceId, resourceItem, resourceItemIndex } = req.body;
    let resource;
    Resource.findById(resourceId, function (err, result) {
        if (err) {
            res.json({
                code: -200,
                message: err.toString()
            });
        } else {
            resource = result;
            if (resourceItemIndex) {
                resource.child.splice(resourceItemIndex, 1, resourceItem);
            } else {
                resource.child.push(resourceItem);
            }
            resource.save(function (err, result) {
                if (err) {
                    res.json({
                        code: -200,
                        message: err.toString()
                    });
                } else {
                    res.json({
                        code: 200,
                        message: '更新子选项成功',
                        data: result
                    });
                }
            });
        }
    });
};

/**
 * 删除分类
 * */
exports.delete = function (req, res) {
    var id = req.body.id;
    if (id) {
        Resource.remove({_id: id}, function (err, resource) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                res.json({
                    code: 200,
                    data: resource
                });
            }
        });
    }
};

/**
 * 删除 子分类
 * */
exports.deleteItem = function (req, res) {
    const { resourceId, resourceItemIndex } = req.body;
    let resource;
    Resource.findById(resourceId, function (err, result) {
        if (err) {
            res.json({
                code: -200,
                message: err.toString()
            });
        } else {
            resource = result;
            resource.child.splice(resourceItemIndex, 1);
            resource.save(function (err, result) {
                if (err) {
                    res.json({
                        code: -200,
                        message: err.toString()
                    });
                } else {
                    res.json({
                        code: 200,
                        message: '删除子选项成功',
                        data: result
                    });
                }
            });
        }
    });
};
