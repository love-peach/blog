const express = require('express');
const router = express.Router();

const frontendArticle = require('../controllers/frontend-article');
const backendArticle = require('../controllers/backend-article');
const frontendUser = require('../controllers/frontend-user');
const backendUser = require('../controllers/backend-user');
const category = require('../controllers/category');
const tag = require('../controllers/tag');
const resource = require('../controllers/resource');

/* ==================== 后台 ==================== */

/**
 * 文章
 * */

// 获取文章列表
router.get('/backend/article/list', backendArticle.list);

// 获取单篇文章
router.get('/backend/article/item', backendArticle.detail);

// 发布文章
router.post('/backend/article/new', backendArticle.save);

// 上下架文章
router.post('/backend/article/offState', backendArticle.toggleOffState);

// 删除文章
router.delete('/backend/article/del', backendArticle.delete);

/**
 * 文章分类
 * */

// 获取文章分类列表
router.get('/backend/article/category/list', category.list);

// 修改文章分类
router.post('/backend/article/category/new', category.save);

// 删除文章分类
router.delete('/backend/article/category/del', category.delete);

/**
 * 文章标签
 * */

// 获取文章分类列表
router.get('/backend/article/tag/list', tag.list);

// 修改文章分类
router.post('/backend/article/tag/new', tag.save);

// 删除文章分类
router.delete('/backend/article/tag/del', tag.delete);

/**
 * 前端资源
 * */
// 获取前端资源列表
router.get('/backend/resource/list', resource.list);

// 修改前端资源分类
router.post('/backend/resource/new', resource.save);

// 修改前端资源 子分类
router.post('/backend/resource/item/new', resource.saveItem);

// 删除前端资源分类
router.delete('/backend/resource/del', resource.delete);

// 删除前端资源 子分类
router.delete('/backend/resource/item/del', resource.deleteItem);

/**
 * 用户
 * */

// 获取用户列表
router.get('/backend/user/list', backendUser.list);

// 删除用户
router.delete('/backend/user/del', backendUser.delete);

/* ==================== 前台 ==================== */

/**
 * 文章
 * */

// 获取文章列表
router.get('/frontend/article/list', frontendArticle.list);

// 获取单篇文章
router.get('/frontend/article/item', frontendArticle.detail);

// 下载
router.get('/frontend/article/download', frontendArticle.download);

/* ===== 喜欢 ===== */
// 点赞
router.post('/frontend/like', frontendArticle.like);

// 取消点赞
router.post('/frontend/unlike', frontendArticle.unlike);

/**
 * 用户
 * */

// 用户登录
router.post('/frontend/user/signin', frontendUser.signIn);

// 用户登出
router.post('/frontend/user/signout', frontendUser.signOut);

// 用户注册
router.post('/frontend/user/signup', frontendUser.signUp);

module.exports = router;
