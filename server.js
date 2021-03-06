const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const microcache = require('route-cache');
const resolve = file => path.resolve(__dirname, file);
const {createBundleRenderer} = require('vue-server-renderer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');

const isProd = process.env.NODE_ENV === 'production';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const dbUrl = 'mongodb://localhost:27017/blog';

const port = process.env.PORT || 8080;
const app = express();

// 引入 api 路由
const routes = require('./backend/routes/index');

let renderer;
let readyPromise;
const templatePath = resolve('./src/index.template.html');
if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const bundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = createRenderer(bundle, {
        template,
        clientManifest
    });
} else {
    readyPromise = require('./build/setup-dev-server')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options);
        }
    );
}

// 设置静态文件缓存时间
const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

app.use(compression({threshold: 0}));
app.use(favicon('./public/logo-48.png'));
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./public', true));
// app.use('/manifest.json', serve('./manifest.json', true))
// app.use('/service-worker.js', serve('./dist/service-worker.js'))

// body 解析中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cookie 解析中间件
app.use(cookieParser('blog'));
app.use(session({
    name: 'sessionId', // 这里的name值得是cookie的name，默认cookie的name是：connect.sid
    secret: 'blog',
    cookie: ({ maxAge: 1000 * 60 * 60 * 24 * 30 }),
    resave: true, // 重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));

require('./backend/db');
// api 路由
app.use('/api', routes);

app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl));

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res));
});

app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});

function createRenderer(bundle, options) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return createBundleRenderer(bundle, Object.assign(options, {
        // for component caching
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./dist'),
        // recommended for performance
        runInNewContext: false
    }));
}

function render(req, res) {
    if (!renderer) {
        return res.end('waiting for compilation... refresh in a moment.')
    }

    const s = Date.now();

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Server', serverInfo);

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url);
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found');
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error');
            console.error(`error during render : ${req.url}`);
            console.error(err.stack);
        }
    };

    const context = {
        title: 'zhangjinpei',
        description: '张晋佩个人博客',
        url: req.url,
        cookies: req.cookies
    };
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err);
        }
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`);
        }
        res.send(html);
    });
}

module.exports = app;
