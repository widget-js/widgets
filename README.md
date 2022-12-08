## 50个桌面组件挑战
项目还在持续完善中

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

### 运行项目
#### Vue
```
yarn serve
```

#### Storybook

```
yarn storybook
```

### 组件列表
#### 打工进度
![labor_progress.gif](screenshot%2Flabor_progress.gif)

- 组件路由：/widget/labor_progress
- 配置路由：/widget/config/labor_progress
