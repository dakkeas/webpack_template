const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
const nodepolyfillplugin = require("node-polyfill-webpack-plugin")


module.exports = {
    mode: "development",
    entry: {
        index: './src/index.js',
        // print: './src/print.js',
    },
    devtool: 'inline-source-map',
    // the webpack-dev-server provides you with a rudimentary web server and the ability to use live reloading. 
    // this tells webpack-dev-server to serve the files from the dist directory on localhost:8080
    devserver: {
        static: './dist',
    },
    plugins: [
        // before we do a build, you should know that the htmlwebpackplugin by default
        //  will generate its own index.html file, even though we already have one in 
        // the dist/ folder.this means that it will replace our index.html file with a newly generated one.
        new htmlwebpackplugin({
            title: '',
            filename: "index.html",
            chucks: ['index'],
        }),

        new nodepolyfillplugin()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    // optimization: {
    //     runtimechunk: 'single',
    // },
    // the optimization.runtimechunk: 'single' was added because in this example we have more than 
    // one entrypoint on a single html page. without this, we could get into trouble 
    module: {
        rules: [
            // 
            {
                // for bundling css files. anything with .css will be detected. 
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
                // module loaders are chained, this arrangement is in convention. 
            },
            {

                // for bundling image files, anything with the following extensions.
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                // loading fonts!
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],

    },
};