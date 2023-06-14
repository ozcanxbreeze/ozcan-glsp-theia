const webpack = require('webpack');
const path = require('path');
const buildRoot = path.resolve(__dirname, 'lib');
const appRoot = path.resolve(__dirname, 'bundle');
var CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',

    entry: [path.resolve(buildRoot, 'index')],
    output: {
        filename: 'ozcan-glsp-server-packed.js',
        path: appRoot
    },



    
    
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            }
        ]
    },
    plugins: [
        new CircularDependencyPlugin({
            exclude: /(node_modules)\/./,
            failOnError: false
        })
    ],
    ignoreWarnings: [/Failed to parse source map/, /Can't resolve .* in '.*ws\/lib'/]
};
