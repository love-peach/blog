/**
 * 通用列表
 * @method list
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} model [description]
 * @param  {[type]} sort    排序
 * @return {[type]}         [description]
 */
exports.list = (req, res, model, sort = '-_id') => {
    sort = sort || '-_id';
    let { limit, page } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    if (!page) page = 1;
    if (!limit) limit = 10;
    const skip = (page - 1) * limit;
    Promise.all([
        model
            .find()
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(),
        model.countAsync()
    ])
        .then(([data, total]) => {
            const totalPage = Math.ceil(total / limit);
            const json = {
                code: 200,
                data: {
                    list: data.map(item => {
                        item.content = `${item.content.substring(0, 380)}...`;
                        return item;
                    }),
                    total,
                    hasNext: totalPage > page ? 1 : 0,
                    hasPrev: page > 1 ? 1 : 0
                }
            };
            res.json(json);
        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            });
        });
};
