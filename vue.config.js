const {defineConfig} = require('@vue/cli-service')
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
