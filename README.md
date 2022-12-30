<p align="center">
<a href="https://github.com/widget-js/widgets">
  <img width="150" src="https://raw.githubusercontent.com/widget-js/widgets/master/screenshot/logo.png" alt="Widgets - Capable and ergonomic widgets." width="300">
</a>
<br>
桌面组件
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/widget-js/widgets" alt="">
  <a href="https://discord.gg/vwSAaRR8cT"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true" alt="Chat"></a>
</p>



### 说明
这是桌面组件前端开源组件，项目还在持续完善中

### Windows 10/11 客户端下载
https://www.microsoft.com/store/productId/9NPR50GQ7T53

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
#
```shell
pnpm serve
```

#### Storybook
用StoryBook运行只能查看组件
```shell
pnpm storybook
```

### 创建自己的组件
```shell
pnpm widget create
```

### 组件列表

#### 打工进度

![labor_progress.gif](screenshot%2Flabor_progress.gif)

- 代码路径：/widgets/labor_progress
- 组件路由：/widget/labor_progress
- 配置路由：/widget/config/labor_progress

学到了什么：

- dayjs：duration，diff
- animate.css: animate__animated animate__fadeOutUp animate__infinite
- vueuse: useIntervalFn

#### 时间进度

![time_progress.png](screenshot%2Ftime_progress.png)
- 代码路径：/widgets/time_progress
- 组件路由：/widget/time_progress

学到了什么：

- vueuse: useTransition
- string.padStart(2,"0"): 字符串不足2位，用0补足。 "7" -> "07"
- 动画曲线：TransitionPresets.easeInOutCubic


#### 歌词小说
- 代码路径：/widgets/lyric_book
- 组件路由：/widget/lyric_book
![歌词小说](./screenshot/lyric_book.png)


