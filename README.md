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

### 默认组件包

| 默认组件包 |                                     https://github.com/widget-js/widgets                                      |
|:-----:|:-------------------------------------------------------------------------------------------------------------:| 
| 待办事项  |                                 ![image](public/images/preview_todo_list.png)                                 |
| 轮播相册  |                                        ![image](screenshot/photo.png)                                         |
| 生日列表  |                                ![gif](public/images/preview_birthday_list.png)                                |
| 倒计时1  |                                  ![gif](public/images/preview_countdown.png)                                  |
| 倒计时2  |                                 ![gif](public/images/preview_countdown2.png)                                  |
| 灵动通知  |                                     ![gif](screenshot/dynamic_island.gif)                                     |
| 打工进度  |                            ![labor_progress.gif](screenshot%2Flabor_progress.gif)                             |
| 时间进度  | <img style="border: 3px solid #c3c3c31f;border-radius: 12px" src="public/images/preview_time_progress.png"/>  |


### AI组件包

https://github.com/rtugeek/ai

#### 一键呼出ChatGPT

![png](https://raw.githubusercontent.com/rtugeek/ai/master/screenshot.png)

### 剪切板组件包

| 剪切板组件包 |                                     https://github.com/rtugeek/clipboard                                     |
|:------:|:------------------------------------------------------------------------------------------------------------:| 
|  剪切板   | ![Clipboard](https://raw.githubusercontent.com/rtugeek/clipboard/master/public/images/preview_clipboard.png) | 
|  快捷搜索  |   <img style="border: 3px solid #c3c3c31f;border-radius: 12px" src="public/images/preview_clipboard.png"/>   |

### 天气组件包

| 天气组件包 |                             https://github.com/rtugeek/weather                             |
|:-----:|:------------------------------------------------------------------------------------------:| 
|  2x2  | ![2x2](https://raw.githubusercontent.com/rtugeek/weather/master/public/preview_small.png)  | 
|  4x2  | ![4x2](https://raw.githubusercontent.com/rtugeek/weather/master/public/preview_medium.png) | 
|  4x4  | ![4x4](https://raw.githubusercontent.com/rtugeek/weather/master/public/preview_large.png)  |


### 工具类组件包
| 工具类组件包                                                                                                        | https://github.com/rtugeek/utilities                                                                          |
|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------| 
| 键盘演示  | ![png](./public/images/preview_keystroke.png)                                                                 |
| 喝水提醒  | <img style="border: 3px solid #c3c3c31f;border-radius: 12px" src="public/images/preview_water_reminder.png"/> |



### 热点组件包
|热点组件包|https://github.com/widget-js/hotspot|
|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------| 
| ![bilibili](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/bilibili_hot_search.png) | ![weibo.png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/weibo_hot_search.png)  |
| ![douyin](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/preview_douyin.png) | ![zhihu.png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/preview_zhihu.png)  |

### 时钟组件包

|                                                        时钟组件包                                                         |                                          https://github.com/rtugeek/clock                                          |
|:--------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------:| 
|![Flip Clock](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_flip_clock.png) <br/>翻页时钟    |     ![Clock](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_clock.png)  <br/>时钟      |
| ![Glitch Clock](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_glitch_clock.png)  <br/>故障时钟 | ![Micky Clock](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_micky_clock.png)  <br/>米奇时钟 |





