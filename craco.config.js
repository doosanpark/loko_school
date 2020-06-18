const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#E5B1A5',
                            '@text-color': '#000',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};