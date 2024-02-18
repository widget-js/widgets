<p align="center">
<a href="https://github.com/widget-js/widgets">
  <img width="150" src="https://raw.githubusercontent.com/widget-js/widgets/master/screenshot/logo.png" alt="Widgets - Capable and ergonomic widgets." width="300">
</a>
<br>
桌面组件
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/widget-js/widgets" alt="">
  <img src="https://img.shields.io/badge/Q%E7%BE%A4-701784679-EB1923?logo=tencentqq&logoColor=white&sanitize=true" alt="Chat">
  <a href="https://space.bilibili.com/207395767"><img src="https://img.shields.io/badge/-Bilibili-00A1D6?logo=bilibili&logoColor=white" alt="bilibili"></a>
  <a href="https://txc.qq.com/products/450189"><img src="https://img.shields.io/badge/-功能建议-2378ff?logo=vowpalwabbit&logoColor=white&sanitize=true" alt="Feedback"></a>
  <a href="https://discord.gg/vwSAaRR8cT"><img src="https://img.shields.io/badge/-Discord-5865F2?logo=discord&logoColor=white" alt="discord"></a>
</p>

![png](public/screenshot.jpg)

### 说明

这是桌面组件前端开源组件，项目还在持续完善中

### Windows 10/11 客户端下载

1. https://www.microsoft.com/store/productId/9NPR50GQ7T53
2. https://widgetjs.cn

### 项目目录结构

```
widgets
├── src
│   ├── components                // 常用Vue组件
│   ├── views                     //
│   ├── widgets                   // 桌面组件文件
│   │   ├── countdown             // 每个桌面组件一个文件夹
│   │   │   ├── XXWidget.vue      // 桌面小组件
│   │   │   ├── XXConfig.vue      // 小组件配置页面
│   │   │   └── XXView.vue        // 小组件页面
│   │   └── ...
│   └── index.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

### 运行项目

#### 1.下载并运行桌面组件客户端

1. https://www.microsoft.com/store/productId/9NPR50GQ7T53
2. https://widgetjs.cn

#### 2.克隆代码

```shell
#克隆代码
git clone https://github.com/widget-js/widget.git

```

#### 3.到项目目录下载依赖

```shell
pnpm install
```

#### 4.运行

```shell
pnpm serve
```

### 组件列表

1. 键盘演示(src/widgets/keystroke)

![png](./public/images/preview_keystroke.png)

2. 喝水提醒

<img style="border-radius: 12px;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" src="public/images/preview_water_reminder.png"/>

3. 待办事项

![image](public/images/preview_todo_list.png)

4. 轮播相册(src/widgets/photo)

![image](screenshot/photo.png)

5. 生日列表

![gif](public/images/preview_birthday_list.png)
6. 倒计时

![gif](public/images/preview_countdown.png)

7. 倒计时2

![gif](public/images/preview_countdown2.png)

8. 灵动通知

![gif](screenshot/dynamic_island.gif)

9. 打工进度

![labor_progress.gif](screenshot%2Flabor_progress.gif)

10. 时间进度

<img style="border-radius: 12px;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" src="public/images/preview_time_progress.png"/>


### 剪切板组件包 
1. 剪切板
![png](https://raw.githubusercontent.com/rtugeek/clipboard/master/public/images/preview_clipboard.png)

2. 剪切板搜索

<img style="border: 3px solid #c3c3c3;border-radius: 12px" src="public/images/preview_clipboard.png"/>


### AI组件包

https://github.com/rtugeek/ai

#### 一键呼出ChatGPT

![png](https://raw.githubusercontent.com/rtugeek/ai/master/screenshot.png)

### 热点组件包
https://github.com/widget-js/hotspot
1. 抖音热榜

![png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/preview_douyin.png)

2. 知乎热榜
![png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/preview_zhihu.png)
3. bilibili热榜

![png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/bilibili_hot_search.png)

4. 微博热榜

![png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/weibo_hot_search.png)


### 时钟组件包

https://github.com/rtugeek/clock

1. 翻页时钟

![png](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_flip_clock.png)

2. 时钟

![png](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_clock.png)

3. 故障时钟

![png](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_glitch_clock.png)

4. 米奇时钟

![png](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_micky_clock.png)
