var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: [
            './scripts/main'
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'scripts/[name].js',
        publicPath: '/scripts/',
        libraryTarget: 'umd'
    },
    externals: [
        // Every non-relative module is external
        /^[a-z\-0-9]+$/
    ],
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new webpack.optimize.DedupePlugin()
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false
        //     },
        //     mangle: {
        //         except: ['$super', '$', 'exports', 'require']
        //     }
        // })

    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            // exclude: /node_modules/,
            test: /\.js?$/,
            loader: 'babel-loader?optional=runtime',
            include: path.join(__dirname, '../scripts')
        }]
    }
};
