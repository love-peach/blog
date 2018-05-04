const User = require('../schemaModels/user');

exports.signOut = function (req, res) {
    delete req.session.user;
    req.session.destroy();
    res.cookie('userId', '', { maxAge: -1 });
    res.cookie('userAccount', '', { maxAge: -1 });
    res.cookie('sessionId', '', { maxAge: -1 });
    res.json({
        success: 1
    });
};

exports.signIn = function (req, res) {
    const { account, password } = req.body;

    User.findByAccount(account, function (err, user) {
        if (err) {
            return res.json({
                code: -200,
                message: err.toString()
            });
        }
        if (!user) {
            return res.json({
                code: -200,
                message: '账号不存在'
            });
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return res.json({
                    code: -200,
                    message: err.toString()
                });
            }

            if (isMatch) {
                req.session.user = user;

                const id = user._id;
                const rememberMe = 2592000000;
                console.log(id.toString(), 'userId');
                res.cookie('userId', id.toString(), { maxAge: rememberMe });
                res.cookie('userAccount', account, { maxAge: rememberMe });
                res.json({
                    code: 200,
                    data: user,
                    message: '成功登录'
                });
            } else {
                return res.json({
                    code: -200,
                    message: '账号/密码不正确'
                });
            }
        });
    });
};

exports.signUp = function (req, res) {
    const userBody = req.body;
    let _user;

    User.findOne({ account: userBody.account }, function (err, user) {
        if (err) {
            return res.json({
                code: -200,
                message: '注册时,查询用户出错'
            });
        }
        if (user) {
            return res.json({
                code: -200,
                message: '用户名重复'
            });
        } else {
            _user = new User(userBody);
            _user.save(function (err, user) {
                if (err) {
                    return res.json({
                        code: -200,
                        message: '注册出错'
                    });
                } else {
                    res.json({
                        code: 200,
                        data: user,
                        message: '注册成功'
                    });
                }
            });
        }
    });
};
