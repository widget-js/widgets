<p align="right">
  中文 | <a href="./README.md">English</a>
</p>

<p align="center">
<a href="https://github.com/widget-js/widgets">
  <img width="150" src="https://raw.githubusercontent.com/widget-js/widgets/master/screenshot/logo.png" alt="Widgets - Capable and ergonomic widgets." width="300">
</a>
<br>
桌面组件 - Widget Hub
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Q%E7%BE%A4-701784679-EB1923?logo=tencentqq&logoColor=white&sanitize=true" alt="Chat">
  <a href="https://space.bilibili.com/207395767"><img src="https://img.shields.io/badge/-Bilibili-00A1D6?logo=bilibili&logoColor=white" alt="bilibili"></a>
  <a href="https://discord.gg/vwSAaRR8cT"><img src="https://img.shields.io/badge/-Discord-5865F2?logo=discord&logoColor=white" alt="discord"></a>
</p>

![png](screenshot/screenshot.jpg)
![png](https://github.com/rtugeek/stock/raw/master/public/screenshot.png)

## 🔗预览所有组件

https://widget-js.github.io/widgets/#/

![png](screenshot/react.png)


## 🤖使用AI生成桌面组件

#### 1. 安装软件
- AI编程工具（Claude Code、Trae、Codex等，任选一个）
- Node.js

#### 2. 安装Skill
```shell
npx skills@latest add widget-js/skills
```

#### 3. 在AI编程工具里，配置下MCP Server
```json
{
  "mcpServers": {
    "widgetjs": {
      "transport": "streamableHttp",
      "url": "http://127.0.0.1:3606/mcp"
    }
  }
}
```

#### 4. 调用skill，并填写提示词
```
/widget 帮我生成一个股票组件，宽高4*4，用户可以自选股票代码，组件可以显示股票的实时价格和涨跌幅
```

![](/screenshot/stock.png)

[📃完整文档链接](https://widgetjs.cn/guide)
