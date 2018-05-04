const User = require('../schemaModels/user');

exports.list = function(req, res) {
    User.fetch(function(err, users) {
        if (err) {
            console.log(err, '后台列表页报错');
        } else {
            res.render('admin/user/list', {
                title: '用户列表',
                users: users
            })
        }
    });
};
