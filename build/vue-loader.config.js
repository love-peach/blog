var ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

var loaders = {};
if (isProd) {
    loaders = {
        css: ExtractTextPlugin.extract({fallback: 'vue-style-loader', use: 'css-loader'}),
        less: ExtractTextPlugin.extract({fallback: 'vue-style-loader', use: 'css-loader!less-loader'})
    }
} else {
    loaders = {
        css: 'vue-style-loader!css-loader',
        less: 'vue-style-loader!css-loader!less-loader'
    }
}
module.exports = {
    loaders: loaders,
    preserveWhitespace: false,
    extractCSS: isProd,
    postcss: [
        require('autoprefixer')({
            browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
        })
    ]
};
