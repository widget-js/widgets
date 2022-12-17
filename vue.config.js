const {defineConfig} = require('@vue/cli-service')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const path = require("path");
const widgetPackage = require("./script/widgetPackage");
const registerWidgetPackage = require("./script/registerWidgetPackage");
const WidgetWebpackPlugin = require("./script/widgetWebpackPlugin");
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  lintOnSave: false,
  filenameHashing: false,
  devServer: {
    port: 8088,
    onListening: function (devServer) {
      if (devServer ) {
          let address = devServer.server.address();
          widgetPackage.url = `http://127.0.0.1:${address.port}/#`;
          registerWidgetPackage(widgetPackage)
      }
    },
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      new WidgetWebpackPlugin()
    ],
    module:{
      rules: [
        {
          test: /\.txt$/i,
          use: 'raw-loader',
        },
      ],
    }
  },
  pluginOptions: {},
})
