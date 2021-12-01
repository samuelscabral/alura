const path = require('path');

const webpack = require('webpack');

const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin')
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins = [];

plugins.push(new HtmlWebpackPlugin({
    hash: true,
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
    },
    filename: 'index.html',
    template: __dirname + '/main.html'
}));

plugins.push(new extractTextPlugin('style.css'))

plugins.push(
    new webpack.ProvidePlugin({
        '$': 'jquery/dist/jquery.js',
        'jQuery': 'jquery/dist/jquery.js'
    })
);

//separa o codigo digitado do codigo  das dependencias
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js'
}));

//endereco do ambiente desenvolvimento
SERVICE_URL = JSON.stringify('http://localhost/3000');

// Plugins usados em ambiente de producao
if (process.env.NODE_ENV == 'production') {
    //endereco ambiente producao
    SERVICE_URL = JSON.stringify('http://meuendereco');
    //Otimiza os modulos
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    //babel minificador
    plugins.push(new babiliPlugin());
    //Usar css em um arquivo separado
    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    }));
}

// 
plugins.push(new webpack.DefinePlugin({ SERVICE_URL }));

//entrada antiga: entry: './app-src/app.js',
module.exports = {
    entry: {
        app: './app-src/app.js',
        vendor: ['jquery', 'bootstrap', 'reflect-metadata']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins
}