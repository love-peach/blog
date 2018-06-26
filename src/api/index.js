import config from './config';
import { createAPI } from 'create-api';

const request = createAPI(config);

/* ==================== 后台 ==================== */

/**
 * 文章
 * */

// 发布文章
exports.backendPostArticle = function (params) {
    return request.post('backend/article/new', params);
};

// 获取文章列表
exports.backendGetArticleList = function (params) {
    return request.get('backend/article/list', params);
};

// 获取单篇文章
exports.backendGetArticleItem = function (params) {
    return request.get('backend/article/item', params);
};

// 上下架文章
exports.backendToggleOffState = function (params) {
    return request.post('backend/article/offState', params);
};

// 删除文章
exports.backendDelArticle = function (params) {
    return request.del('backend/article/del', params);
};

/**
 * 文章分类
 * */

// 获取文章分类列表
exports.backendGetCategoryList = function (params) {
    return request.get('backend/article/category/list', params);
};

// 修改文章分类
exports.backendPostArticleCategory = function (params) {
    return request.post('backend/article/category/new', params);
};
// 删除文章分类
exports.backendDelCategory = function (params) {
    return request.del('backend/article/category/del', params);
};

/**
 * 文章标签
 * */

// 获取文章分类列表
exports.backendGetTagList = function (params) {
    return request.get('backend/article/tag/list', params);
};

// 修改文章分类
exports.backendPostArticleTag = function (params) {
    return request.post('backend/article/tag/new', params);
};
// 删除文章分类
exports.backendDelTag = function (params) {
    return request.del('backend/article/tag/del', params);
};

/**
 * 前端资源
 * */

// 获取前端资源列表
exports.backendGetResourceList = function (params) {
    return request.get('backend/resource/list', params);
};
// 修改前端资源分类
exports.backendPostResource = function (params) {
    return request.post('backend/resource/new', params);
};
// 修改前端资源 子分类
exports.backendPostResourceItem = function (params) {
    return request.post('backend/resource/item/new', params);
};
// 删除前端资源分类
exports.backendDelResource = function (params) {
    return request.del('backend/resource/del', params);
};
// 删除前端资源 子分类
exports.backendDelResourceItem = function (params) {
    return request.del('backend/resource/item/del', params);
};

/**
 * 用户
 * */

// 获取用户列表
exports.backendGetUserList = function (params) {
    return request.get('backend/user/list', params);
};

// 删除用户
exports.backendDelUser = function (params) {
    return request.del('backend/user/del', params);
};

/* ==================== 前台 ==================== */

/**
 * 文章
 * */

// 获取文章列表
exports.frontendGetArticleList = function (params) {
    return request.get('frontend/article/list', params);
};

// 获取单篇文章
exports.frontendGetArticleItem = function (params) {
    return request.get('frontend/article/item', params);
};

// 下载
exports.frontendDownloadArticleItem = function (params) {
    return request.get('frontend/article/download', params);
};

/* ===== 喜欢 ===== */

// 点赞
exports.frontendLike = function (params) {
    return request.post('frontend/like', params);
};

// 取消点赞
exports.frontendUnlike = function (params) {
    return request.post('frontend/unlike', params);
};

/**
 * 用户
 * */

// 用户登录
exports.frontendSignIn = function (params) {
    return request.post('frontend/user/signin', params);
};

// 用户登出
exports.frontendSignOut = function (params) {
    return request.post('frontend/user/signout', params);
};

// 用户注册
exports.frontendSignUp = function (params) {
    return request.post('frontend/user/signup', params);
};
