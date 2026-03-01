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
  <a href="https://faq.widgetjs.cn"><img src="https://img.shields.io/badge/-功能建议-2378ff?logo=vowpalwabbit&logoColor=white&sanitize=true" alt="Feedback"></a>
  <a href="https://discord.gg/vwSAaRR8cT"><img src="https://img.shields.io/badge/-Discord-5865F2?logo=discord&logoColor=white" alt="discord"></a>
</p>

![png](screenshot/screenshot.jpg)
![png](https://github.com/rtugeek/stock/raw/master/public/screenshot.png)

## 🔗预览所有组件

https://widget-js.github.io/widgets/#/  

![png](screenshot/react.png)


## 📖说明

这是桌面组件前端开源组件，项目还在持续完善中

Windows 10/11 客户端下载地址：
1️⃣ https://www.microsoft.com/store/productId/9NPR50GQ7T53
2️⃣ https://widgetjs.cn

## 🗂️项目目录结构

```
widgets
├── src
│   ├── components                // 常用Vue组件
│   ├── views                     // 页面文件
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

## ▶️运行项目

1. 下载并运行桌面组件客户端
2. 克隆代码

```shell
git clone https://github.com/widget-js/widget.git
```

3. 到项目目录下载依赖

```shell
pnpm run install
```

4. 运行

```shell
pnpm run dev
```
## 📋组件列表


> 🔗全部组件预览地址：https://widget-js.github.io/widgets/#/add

### AI组件包

https://github.com/rtugeek/ai

### 一键呼出AI DeepSeek/ChatGPT/Gemini

![png](https://raw.githubusercontent.com/rtugeek/ai/refs/heads/master/screenshot/ai.png)

### 监控组件包

|                                                       监控组件包                                                        |
|:------------------------------------------------------------------------------------------------------------------:|
|   ![监控面板](https://github.com/rtugeek/monitor/blob/master/public/image/preview_base_panel.png?raw=true) <br/>监控面板   |
| ![监控面板](https://github.com/rtugeek/monitor/blob/master/public/image/preview_energy_label.png?raw=true) <br/>打工能耗标签 |
|   ![监控面板](https://github.com/rtugeek/monitor/blob/master/public/image/preview_server.png?raw=true) <br/>服务器监控面板    |

### 默认组件包

| 默认组件包 |                                   https://github.com/widget-js/widgets                                   |
|:-----:|:--------------------------------------------------------------------------------------------------------:|
|  倒计时  |                                 ![gif](screenshot/widget_countdown.png)                                  |
| 灵动通知  |                                  ![gif](screenshot/dynamic_island.gif)                                   |
| 打工进度  |                     ![screenshot/labor_progress.gif](screenshot/labor_progress.gif)                      |
| 时间进度  | <img style="border: 3px solid #c3c3c31f;border-radius: 12px" src="screenshot/widget_time_progress.png"/> |

### 文件夹

https://github.com/rtugeek/grid

![png](https://raw.githubusercontent.com/rtugeek/grid/refs/heads/master/public/preview_grid.png)

### iTime组件包

| iTime组件包 |                                        https://github.com/rtugeek/itime-web                                         |
|:--------:|:-------------------------------------------------------------------------------------------------------------------:|
|   待办事项   | ![image](https://raw.githubusercontent.com/rtugeek/itime-web/refs/heads/master/public/images/preview_todo_list.png) |
| Deadline |  ![gif](https://raw.githubusercontent.com/rtugeek/itime-web/refs/heads/master/public/images/preview_deadline.png)   |
|   番茄钟    |  ![gif](https://raw.githubusercontent.com/rtugeek/itime-web/refs/heads/master/public/images/preview_pomodoro.png)   |
|    日历    |  ![gif](https://raw.githubusercontent.com/rtugeek/itime-web/refs/heads/master/public/images/preview_calendar.png)   |

### 剪切板组件包

| 剪切板组件包 |                                     https://github.com/rtugeek/clipboard                                     |
|:------:|:------------------------------------------------------------------------------------------------------------:|
|  剪切板   | ![Clipboard](https://raw.githubusercontent.com/rtugeek/clipboard/master/public/images/preview_clipboard.png) |

### 天气组件包

| 天气组件包 |                             https://github.com/rtugeek/weather                             |
|:-----:|:------------------------------------------------------------------------------------------:|
|  2x2  | ![2x2](https://raw.githubusercontent.com/rtugeek/weather/master/public/preview_small.png)  |
|  4x2  | ![4x2](https://raw.githubusercontent.com/rtugeek/weather/master/public/preview_medium.png) |
|  4x4  | ![4x4](https://raw.githubusercontent.com/rtugeek/weather/master/public/preview_large.png)  |

### 热点组件包

|                                                       热点组件包                                                        | https://github.com/widget-js/hotspot                                                                        |
|:------------------------------------------------------------------------------------------------------------------:|-------------------------------------------------------------------------------------------------------------|
|   ![bilibili](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/bilibili_hot_search.png)    | ![weibo.png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/weibo_hot_search.png) |
|       ![douyin](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/preview_douyin.png)       | ![zhihu.png](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/preview_zhihu.png)    |
| ![douyin](https://raw.githubusercontent.com/widget-js/hotspot/master/public/images/preview_bangumi.png)  <br/>追番助手 |                                                                                                             |

### 时钟组件包

|                                                           时钟组件包                                                           |                                            https://github.com/rtugeek/clock                                             |
|:-------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------:|
|   ![Flip Clock](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_flip_clock.png) <br/>翻页时钟    |        ![Clock](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_clock.png)  <br/>时钟        |
| ![Glitch Clock](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_glitch_clock.png)  <br/>故障时钟 | ![Micky Clock](https://raw.githubusercontent.com/rtugeek/clock/master/public/images/preview_micky_clock.png)  <br/>米奇时钟 |

### 相册组件包

|                                                   相册组件包                                                   |                                      https://github.com/rtugeek/photo                                       |
|:---------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------:|
| ![大头贴](https://raw.githubusercontent.com/rtugeek/photo/master/public/images/preview_sticker.png) <br/>大头贴 | ![Clock](https://raw.githubusercontent.com/rtugeek/photo/master/public/images/preview_photo.png)  <br/>轮播相册 |

### 趣味组件包

|                                                     趣味组件包                                                     |                                                  https://github.com/rtugeek/fun                                                  |
|:-------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------:|
| ![电子木鱼](https://raw.githubusercontent.com/rtugeek/fun/master/public/images/preview_wooden_fish.png) <br/>电子木鱼 | ![preview_hitler.png](https://raw.githubusercontent.com/rtugeek/fun/refs/heads/master/public/images/preview_hitler.png) <br/>仪表盘 |


