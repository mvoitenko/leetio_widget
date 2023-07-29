const path = require('path');

module.exports = {
    entry: './src/wrapper-widget.js',
    output: {
        filename: 'leetio_widget.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        clean: true,
        library: {
            name: "WrapperWidget",
            type: "window"
        },
        libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "cssimportant-loader",
                ],
            }
        ]
    }
};