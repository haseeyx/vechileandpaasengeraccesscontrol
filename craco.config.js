const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#1890ff', // Customize primary color
                            '@font-size-base': '16px',  // Customize base font size
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
