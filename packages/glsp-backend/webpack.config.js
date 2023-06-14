const webpack = require('webpack');
const path = require('path');
const appRoot = path.resolve(__dirname, 'bundle');

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
     
    ignoreWarnings: [/Failed to parse source map/, /Can't resolve .* in '.*ws\/lib'/]
};
