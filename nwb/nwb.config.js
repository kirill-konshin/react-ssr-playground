var path = require('path');

module.exports = {
    type: 'react-app',
    webpack: {
        aliases: {
            react: path.dirname(require.resolve('react'))
        }
    }
};
