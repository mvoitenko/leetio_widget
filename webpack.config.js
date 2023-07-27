const path = require('path');



module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/wrapper-widget.js',
    output: {
        filename: 'leetio_widget.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/',
        library: 'WrapperWidget',
        libraryExport: 'default',
        libraryTarget: 'window',
    },
    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.(js|jsx)$/, // определяем тип файлов
                exclude: /node_modules/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:[ "@babel/preset-react"]    // используемые плагины
                }
            },
            {
                test: /\.css$/,
                use: [
                    // fallback to style-loader in development
                    // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "style-loader",
                    "css-loader",
                    "cssimportant-loader",
                ],
            },
        ]
    }
};