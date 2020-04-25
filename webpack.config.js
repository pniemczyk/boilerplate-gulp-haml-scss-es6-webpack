var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: './src/assets/js/app.js',
    output: {
        path: __dirname,
        filename: 'app.js'
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'build'),
    //     compress: true,
    //     port: 9000
    // },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $ : "jquery",
            jQuery : "jquery",
            "window.jQuery" : "jquery",
            "root.jQuery" : "jquery"
        })
    ]
};
