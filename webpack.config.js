module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    optimization: {
        minimize: false
    }
};