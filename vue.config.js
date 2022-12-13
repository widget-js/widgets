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
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      let address = devServer.server.address();
      const port = address.port;
      console.log(devServer.server.url);
      console.log('Listening on port:', port);
      widgetPackage.debugUrl = `http://127.0.0.1:${address.port}/#`;
      registerWidgetPackage(widgetPackage)
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
  },
  pluginOptions: {},
})
