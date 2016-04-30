var loaders = require('./loaders'),
    _ = require('lodash'),
    bourbon = require('node-bourbon'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    conf = require('../conf'),
    packageJson = require('../../package.json');

function getConfig(env) {
    var config = getCommonConfig(env);

    env = env || process.env.NODE_ENV;

    switch (env) {
        case conf.tags.dev:
            config = _.merge(config, getDevConfig(env));
            break;
        case conf.tags.build:
            config = _.merge(config, getBuildConfig(env));
            break;
        case conf.tags.dist:
            config = _.merge(config, getDistConfig(env));
            break;
        case conf.tags.test:
            config = _.merge(config, getTestConfig(env));
            break;
        default:
            throw new Error('NODE_ENV not equal to development, production, or test. It is equal to ' + env);
    }

    return config;
}

function getCommonConfig() {
    return {
        context: conf.paths.root,
        entry: ['./src/index.js'],
        stats: {
            colors: true,
            reasons: true
        },
        resolve: {
            extensions: ['', '.ts', '.js', '.json', '.scss'],
            modulesDirectories: ['./src', 'shared', 'node_modules'],
            root: __dirname
        },
        module: {
            loaders: loaders
        },
        babelLoader: {
            presets: ['es2015']
        }
    };
}

function getDevConfig(env) {
    return {
        output: {
            filename: 'bundle.js',
            path: conf.paths.dev,
            publicPath: conf.publicPaths.dev
        },
        devtool: 'source-map',
        cssLoader: {
            sourceMap: true
        },
        sassLoader: {
            includePaths: bourbon.includePaths,
            sourceMap: true,
        },
        styleLoader: {
            sourceMap: true
        },
        plugins: _.concat(getCommonPlugins(env), 
            new webpack.OldWatchingPlugin(),
            new ExtractTextPlugin('bundle.css')
        )
    };
}

function getBuildConfig(env) {
    var distConfig = getDistConfig(env);

    return _.extend({}, distConfig, {
        output: {
            filename: 'bundle.js',
            path: conf.paths.dist
        },
        plugins: _.concat(getCommonPlugins(env), [
            new webpack.optimize.DedupePlugin(),
            new ExtractTextPlugin('bundle.css'),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        ])
    });
}

function getDistConfig(env) {
    return {
        output: {
            filename: 'bundle.min.js',
            path: conf.paths.dist
        },
        sassLoader: {
            includePaths: bourbon.includePaths
        },
        plugins: _.concat(getCommonPlugins(env), [
            new ExtractTextPlugin('bundle.min.css'),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ])
    };
}

function getTestConfig(env) {
     return {};
}

function getCommonPlugins(env) {
    return [
        new webpack.BannerPlugin(getBanner(env), { raw: true }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body',
            hash: true
        })
    ];
}

function getBanner(env) {
    if (env === conf.tags.dist) {
        return '/*! ' + packageJson.name + ' v' + packageJson.version + ' | MIT | built with ♥ by ' + packageJson.author + ' */'.trim();
    } else {
        return [
            '/*!',
            '* ' + packageJson.name + ' JavaScript Library v' + packageJson.version,
            '*',
            '* @license MIT',
            '*',
            '* built with ♥ by ' + packageJson.author,
            '*/',
        ].join('\n');
    }
}

module.exports = getConfig;