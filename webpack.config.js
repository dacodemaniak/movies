var path = require('path');
var webpack = require('webpack');

 module.exports = {
     entry: './src/main.ts',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'bundle.js',
         chunkFilename: "bundle.chunk.js"
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 options: {
                    presets: [
                      ['@babel/preset-env']
                    ]
                  }
             },
             {
                 test: /\.tsx?$/,
                 use: 'ts-loader',
                 exclude: /node_modules/
             }   
         ]
     },
     resolve: {
    	 extensions: [
    		 '.ts',
    		 '.js',
    		 '.tsx'
    	 ]
     },
     devtool: 'source-map'
 };