require('babel-core/register')({
    presets: [
        'react-app'
    ],
    plugins: [
        'dynamic-import-webpack', // syntax-dynamic-import does not work with node
        'transform-decorators-legacy',
        'transform-ensure-ignore'
    ]
});

require('babel-polyfill');

[
    '.css',
    '.less',
    '.sass',
    '.ttf',
    '.woff',
    '.woff2',
    '.svg',
    '.eot',
    '.gif',
    '.jpg',
    '.jpeg',
    '.png'
].forEach(function(ext) {
    require.extensions[ext] = function() {};
});

require('./server');
