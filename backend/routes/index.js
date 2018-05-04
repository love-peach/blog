const express = require('express');
const router = express.Router();

const frontendArticle = require('../controllers/frontend-article');
const backendArticle = require('../controllers/backend-article');
const frontendUser = require('../controllers/frontend-user');
const backendUser = require('../controllers/backend-user');

/* ==================== 后台 ==================== */

/* ===== 文章 ===== */

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

/* ==================== 前台 ==================== */

/* ===== 文章 ===== */

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

/* ===== 用户 ===== */
// 用户登录
router.post('/frontend/user/signin', frontendUser.signIn);

// 用户登出
router.post('/frontend/user/signout', frontendUser.signOut);

// 用户注册
router.post('/frontend/user/signup', frontendUser.signUp);

router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该页面'
    });
});

module.exports = router;
