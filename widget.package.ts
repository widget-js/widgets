import { WidgetPackage } from '@widget-js/core'

export default new WidgetPackage({
  name: 'cn.widgetjs.widgets',
  author: 'Widget JS',
  homepage: 'https://widgetjs.cn',
  description: {
    'zh-CN': '内置基础组件'
  },
  entry: 'index.html',
  title: { 'zh-CN': '内置基础组件' },
  version: '0.0.1',
  hash: true,
  devOptions: {
    folder: './src/widgets/',
    route: true,
    devUrl: 'http://localhost:5174'
  },
  widgets: [],
  permissions: []
})
