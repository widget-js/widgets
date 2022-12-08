const {defineConfig} = require('@vue/cli-service')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const path = require("path");

module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  lintOnSave: false,
  filenameHashing: false,
  devServer:{
    port: 8088,
  },
  chainWebpack(config) {
    config.resolve.alias.set( 'vue', path.resolve('./node_modules/vue'))
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  pluginOptions: {},
})
