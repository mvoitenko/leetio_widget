const path = require('path');



module.exports = {
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
            }
        ]
    }
};