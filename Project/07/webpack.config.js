const webpack = require('webpack');

module.exports = {
    entry: {
        userDetail: './components/userDetail/userDetail.jsx',
        userPhotos: './components/userPhotos/userPhotos.jsx',
        userList: './components/userList/userList.jsx',
        LoginRegister: './components/LoginRegister/LoginRegister.jsx',
        photoShare: './photoShare.jsx',

    },
    plugins: [
        new webpack.DefinePlugin({
            '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader" ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        fallback: {
            "fs": false
        },
    },
    output: {
        path: `${__dirname}/compiled`,
        publicPath: '/',
        filename: '[name].bundle.js',
    },
    mode: 'development',
};
