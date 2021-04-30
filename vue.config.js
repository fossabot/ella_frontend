const webpack = require('webpack');
const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
require('dotenv').config();
const {TITLE, THEME_COLOR} = require("./config/ella.config.js");

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
        name: TITLE,
        themeColor: THEME_COLOR,
        msTileColor: THEME_COLOR,
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'service-worker.js',
        },
        manifestOptions: {
            background_color: "#fff",
            "file_handlers": [
                {
                    "action": "/#/",
                    "accept": {
                        "application/efa": [".efa"]
                    }
                }
            ]
        }
    },
    devServer: {
        disableHostCheck: true
    },
    publicPath: '',
    css: {
        loaderOptions: {
            sass: {
                additionalData: THEME_COLOR ? '$primary: ' + THEME_COLOR + ";" : "",
                implementation: require('sass'),
            },
        },
    },

};
