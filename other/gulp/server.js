var gulp = require('gulp'),
    gutil = require('gulp-util'),
    conf = require('../conf'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('../webpack/webpack');

gulp.task('server:dev', function(callback) {
    // modify some webpack config options
    var webpackDevConfig = webpackConfig(conf.tags.dev);

    webpackDevConfig.debug = true;
    //webpackConfig.devtool = 'eval';

    new WebpackDevServer(webpack(webpackDevConfig), {
    	contentBase: './public',
        //publicPath: webpackDevConfig.output.publicPath,
        stats: {
            colors: true
        }/*,
        hot: true,
        quiet: false,
        noInfo: false,*/
    }).listen(8080, 'localhost', function(err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
});