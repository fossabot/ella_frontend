const webpack = require('webpack');
const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
require('dotenv').config();

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"'
                }
            })
        ]
    },
    pwa: {
        name: process.env.TITLE,
        themeColor: process.env.THEME_COLOR,
        msTileColor: process.env.THEME_COLOR,
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'sw.js',
        },
        manifestOptions: {
            background_color: "#fff"
        }
    },
    devServer: {
        disableHostCheck: true
    },
    publicPath: '',
    css: {
        loaderOptions: {
            sass: {
                additionalData: '$primary: ' + process.env.VUE_APP_THEME_COLOR+";"
            },
        },
    },

};
