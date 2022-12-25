const {defineConfig} = require('@vue/cli-service')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {WidgetWebpackPlugin} = require("@widget-js/webpack-plugin");
module.exports = defineConfig({
  publicPath: "./",
  lintOnSave: false,
  filenameHashing: false,
  devServer: {
    port: 8088
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
    module: {
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
