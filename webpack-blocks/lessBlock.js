function less(options) {
    options = options || {};

    const hasOptions = Object.keys(options).length > 0;

    return (context) => {

        const config = {
            module: {
                loaders: [
                    {
                        test: context.fileType('text/x-less'),
                        loaders: [
                            'style-loader',
                            options.sourceMap ? 'css-loader?sourceMap' : 'css-loader',
                            hasOptions ? 'less-loader?' + JSON.stringify(options) : 'less-loader'
                        ]
                    }
                ]
            }
        };

        if (options.sourceMap && context.webpackVersion.major >= 2) {
            // Hacky fix for an issue with the sass-loader and webpack@2
            // (see https://github.com/andywer/webpack-blocks/issues/116)

            config.plugins = [
                new context.webpack.LoaderOptionsPlugin({
                    options: {
                        context: '/'
                    }
                })
            ];

        }

        return config;

    };
}

module.exports = less;