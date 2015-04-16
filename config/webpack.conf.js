var path = require('path');
var webpack = require('webpack');

module.exports = {
    // devtool: 'eval',
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
        new webpack.SourceMapDevToolPlugin({
           filename: './scripts/[name].map'
        }),
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin()
        // new webpack.optimize.CommonsChunkPlugin('main.js')
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            // exclude: /node_modules/,
            test: /\.js?$/,
            //exclude: /node_modules/,
            loader: 'babel-loader',
            include: path.join(__dirname, '../scripts')
        }]
    }
};
