const express = require('express');
const router = express.Router();

const Article = require('../controllers/article');

/* ==================== 后台 ==================== */
// 发布文章
router.post('/backend/article/new', Article.save);

/* ==================== 前台 ==================== */
// 获取文章列表
router.get('/frontend/article/list', Article.list);

// 获取单篇文章
router.get('/frontend/article/item', Article.detail);

// 上下架文章
router.post('/backend/article/offState', Article.toggleOffState);

// 删除文章
router.delete('/backend/article/del', Article.delete);

router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该页面'
    });
});

module.exports = router;
