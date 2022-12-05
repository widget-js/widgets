## 桌面组件

### 项目目录结构

```
widgets
├── src
│   ├── components                // 常用Vue组件
│   ├── views                     //
│   ├── widgets                   // 桌面组件文件
│   │   └── countdown             // 每个桌面组件一个文件夹
│   │       ├── XXWidget.vue      // 桌面小组件
│   │       └── XXConfig.vue      // 小组件配置页面
│   │       └── XXView.vue        // 小组件页面
│   └── index.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

### 项目部署

#### 依赖下载

```
// 下载依赖可能需要翻墙
yarn install
```

#### 单独启动Vue

```
yarn serve
```

#### 启动Electron版

```
yarn electron:serve
```

#### 项目主要依赖

[Element Plus](https://element-plus.gitee.io/zh-CN/component/button.html)
[MingCute图标库](https://www.mingcute.com/)
[DayJs时间解析](https://dayjs.fenxianglu.cn)
[lunar-typescrip日期转换](https://6tail.cn/calendar/api.html)
