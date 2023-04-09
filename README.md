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

![png](public/screenshot.jpg)

### 说明

这是桌面组件前端开源组件，项目还在持续完善中

### Windows 10/11 客户端下载

1. https://www.microsoft.com/store/productId/9NPR50GQ7T53
2. https://haihaihai.vip

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

#### 1.下载并运行桌面组件客户端
1. https://www.microsoft.com/store/productId/9NPR50GQ7T53
2. https://haihaihai.vip

#### 2.克隆代码

```shell
#克隆代码
git clone https://github.com/widget-js/hotspot.git

```
#### 3.到项目目录下载依赖
```shell
pnpm install
```
#### 4.运行
```shell
pnpm serve
```

### 创建自己的组件

```shell
pnpm widget create
```

### 组件列表

#### 键盘演示

![png](./public/images/preview_keystroke.png)

https://github.com/widget-js/hotspot


#### 抖音热榜

![png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/preview_douyin.png)

见热点组件包：https://github.com/widget-js/hotspot


#### 喝水提醒

![gif](public/images/preview_water_reminder.png)

- 代码路径：/widgets/water-reminder
- 组件路由：/widget/water_reminder
- 配置路由：/widget/config/water_reminder

#### 生日列表

![gif](public/images/preview_birthday_list.png)

- 代码路径：/widgets/birthday_list
- 组件路由：/widget/birthday_list
- 配置路由：/widget/config/birthday_list

#### 代办事项

![image](public/images/preview_todo_list.png)

- 代码路径：/widgets/todo-list
- 组件路由：/widget/todo-list
- 配置路由：/widget/config/todo-list

#### 倒计时

![gif](public/images/preview_countdown.png)

- 代码路径：/widgets/countdown
- 组件路由：/widget/countdown
- 配置路由：/widget/config/countdown

#### 倒计时2

![gif](public/images/preview_countdown2.png)

- 代码路径：/widgets/countdown2
- 组件路由：/widget/countdown2
- 配置路由：/widget/config/countdown2

#### 灵动通知

![gif](screenshot/dynamic_island.gif)

- 代码路径：/widgets/dynamic_island
- 组件路由：/widget/dynamic_island
- 配置路由：/widget/config/dynamic_island

#### 打工进度

![labor_progress.gif](screenshot%2Flabor_progress.gif)

- 代码路径：/widgets/labor_progress
- 组件路由：/widget/labor_progress
- 配置路由：/widget/config/labor_progress

#### 时间进度

![time_progress.png](public/images/preview_time_progress.png)

- 代码路径：/widgets/time_progress
- 组件路由：/widget/time_progress


#### 知乎热榜

![png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/preview_zhihu.png)

见热点组件包：https://github.com/widget-js/hotspot

#### bilibili热榜

![png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/bilibili_hot_search.png)

见热点组件包：https://github.com/widget-js/hotspot

#### 微博热榜

![png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/weibo_hot_search.png)

见热点组件包：https://github.com/widget-js/hotspot



#### 歌词小说
![歌词小说](public/images/preview_lyric_book.png)
- 代码路径：/widgets/lyric_book
- 组件路由：/widget/lyric_book


