const request = require('./request');

// 发布文章
exports.postArticle = function (params) {
    return request.post('backend/article/new', params);
};

// 获取文章列表
exports.getArticleList = function (params) {
    console.log(params, 'params');
    return request.get('frontend/article/list', params);
};

// 获取单篇文章
exports.getArticleItem = function (params) {
    return request.get('frontend/article/item', params);
};
