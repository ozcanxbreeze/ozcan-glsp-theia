const webpack = require('webpack');
const path = require('path');
const appRoot = path.resolve(__dirname, 'bundle');
var CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    target: 'node',
    mode: 'development',
    devtool: 'source-map',

    entry: './src/index.ts',
    output: {
        path: appRoot,
        filename: 'ozcan-glsp-server-packed.js'
    },
    
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    
    module: {
        rules: [
           {
              test: /\.ts$/,
              exclude: /node_modules/,
              loader: 'ts-loader'
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
