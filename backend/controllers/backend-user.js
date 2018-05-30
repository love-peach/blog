const User = require('../schemaModels/user');

exports.list = function (req, res) {
    let { limit, page, keyword } = req.query;
    const sort = '-updateAt';

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

    User.count(data, function (err, count) {
        if (err) {
            console.log(err);
        }
        total = count;
    });

    User.fetch({data, limit, sort, skip}, function (err, user) {
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
                    list: user,
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
 * 删除用户
 * */
exports.delete = function (req, res) {
    var id = req.body.id;
    if (id) {
        User.remove({_id: id}, function (err, user) {
            if (err) {
                res.json({
                    code: -200,
                    message: err.toString()
                });
            } else {
                res.json({
                    code: 200,
                    data: user
                });
            }
        });
    }
};
