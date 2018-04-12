const express = require('express');
const router = express.Router();

const Article = require('../controllers/article');

/* ==================== 后台 ==================== */
// 发布文章
router.post('/backend/article/new', Article.save);

/* ==================== 前台 ==================== */
// 获取文章列表
router.get('/frontend/article/list', Article.list);

// 获取文章列表
router.get('/frontend/article/item', Article.detail);

router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该页面'
    });
});

module.exports = router;
