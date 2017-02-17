function less(options) {
    options = options || {};

    const hasOptions = Object.keys(options).length > 0;

    return (context) => ({
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
    })
}

module.exports = less;